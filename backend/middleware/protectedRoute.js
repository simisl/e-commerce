const jwt = require("jsonwebtoken");
const {jwt_secret} = require('../config/config');
const mongoose = require("mongoose");
const userModel = mongoose.model("userModel")

module.exports = (req, res, next) => {
    
    const {authorization} = req.headers;
    console.log('autherr',authorization)
    if(!authorization){
        return res.status(400).json({error: "Userr not logged in"})
    }
    
    const token = authorization.replace('Bearer ', '')
    
    jwt.verify(token, jwt_secret, (error, payload)=>{
        
        if(error){
            console.log('err',error)
            return res.status(400).json({error: "User not logged in"})
        }
        const {_id} = payload;
         console.log("user logged",payload)
        userModel.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser
            next();
        })
    });

}
