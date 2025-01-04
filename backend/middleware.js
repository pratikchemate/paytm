const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = (req , res,next)=>{
    const authHeader = req.headers['authorization']
    //console.log(authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({status : "wrong JWT"})
    }
    const token = authHeader.split(' ')[1];

    try { 
        const decoded = jwt.verify(token , JWT_SECRET)
        if(decoded.userId){
            req.userId = decoded.userId
            next();
        }else{
            return res.status(403).json({}) 
        }
    }catch(e){
        return res.status(403).json({})
    }
}

module.exports = { authMiddleware}