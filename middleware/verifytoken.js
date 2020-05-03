const jwt  =require('jsonwebtoken')
const config = require('../config/config')
const secret = require('../config/secret')
module.exports = (req,res,next)=>{
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send({
            error:'You must be logged in.'
        });
        
    }
  
    const token=authorization.replace('Bearer ','');

    jwt.verify(token,secret.secret,async(err,payload)=>{
        if(err){
            return res.status(401).send({error:'You must be logged in.'});
        }
        const{userData}=payload;

      
        next();

    })
}