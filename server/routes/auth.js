const express = require('express');
const router = express.Router();
const User = require('../models/User.js')
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const JWT_SECRET = 'Hithisisasecret';
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchuser");

// creating a user at  /api/auth/createuser

router.post('/createuser',[body('email','Enter a valid Email').isEmail(),
body('name','Enter a valid Name').isLength({min:3}),
body('password','Enter a valid Password').isLength({min:5})],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a person the same email already exisis"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name:req.body.name,
            email: req.body.email,
            password:secPass
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({"authToken":authToken});
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Some Error has occured with creating new user");
    }
})
// logging in a user at  /api/auth/login

router.post('/login',
body('email','Enter a valid Email').isEmail(),
body('password','Password cannot be Blank').exists(),
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error:"Sorry User does not exist"});
            }
            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({"True Password":user.password,
                                                "Given Password":password})
            }
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data,JWT_SECRET);
            res.json({authToken});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Some Error has occured with creating new user");
    }
})
router.post('/getUser',fetchUser,async (req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.json(user)
;    }catch(err){
        console.error(err.message);
        res.status(500).send("Some Error has occured with creating new user");
    }
})
module.exports = router;