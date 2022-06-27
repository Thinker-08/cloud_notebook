const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes.js')
const {body, validationResult} = require('express-validator');

// GET All the notes of the logged in user

router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try{
        const notes = await Notes.find({user :req.user.id})
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some Error has occured with creating new user");
    }
})

//Add Notes

router.post('/addnotes',fetchUser,
[body('title','Enter a valid Title').isLength({min:3}),
body('description','Description must be of minimum 5 length').isLength({min:5})],
async (req,res)=>{
    try{
        const {title,description,tag} = req.body;
        const notes = await Notes.find({user :req.user.id})
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const note = new Notes({
            title,
            description,
            tag,
            user:req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Updating Notes login required

router.put('/updatenote/:id',fetchUser,
async (req,res)=>{
    const {title,description,tag} = req.body;
    try{
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag};
        
        //finding the note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send("User Not found")
        }
        if(note.user.toString()!==req.user.id){
            res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

// Delete node

router.delete('/deletenote/:id',fetchUser,
async (req,res)=>{ 
    //finding the note to be updated
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send("User Not found")
        }
        if(note.user.toString()!==req.user.id){
            res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json("Success");
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;