const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Hithisisasecret';

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Invalid Token"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next()
    }
    catch(err){
        res.status(401).send({error:"Invalid Token"})
    }
}

module.exports = fetchuser