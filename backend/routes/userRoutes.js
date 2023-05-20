const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const userModel = mongoose.model("userModel")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwt_secret} = require('../config/config');
const protectedRoute = require('../middleware/protectedRoute');


router.post("/registration", (req,res)=>{
    const {email, password, firstName, lastName} = req.body;
    if(!email || !password || !firstName || !lastName){
        return res.status(400).json({error: "All the fields are mandatory"});
    }
    userModel.findOne({email})
    .then((userExists)=>{
        if(userExists){
            return res.status(500).json({error: "User already exists in the database"});
        }
        bcryptjs.hash(password, 16)
        .then((hashedPass)=>{
            const user = new userModel({email: email, password: hashedPass, firstName: firstName, lastName: lastName});
            user.save()
            .then((newUser)=>{
                return res.status(201).json({message: "User registered successfully"});
            })
            .catch((error)=>{
                console.log('error',error);
            })
        })
        .catch((error)=>{
            console.log('error',error);
        })
    })
    .catch((error)=>{
        console.log('Error',error);
    })
})

router.post("/login", (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password ){
        return res.status(400).json({error: "All the fields are mandatory"});
    }
    userModel.findOne({email})
    .then((userExists)=>{
        if(!userExists){
            return res.status(401).json({error: "Invalid Credentials"});
        }

        bcryptjs.compare(password, userExists.password)
        .then((matched)=>{
            if(matched){
                const jwtToken = jwt.sign({_id: userExists._id}, jwt_secret);
                const userInfo = { "email": userExists.email , "firstName": userExists.firstName, "lastName": userExists.lastName, id: userExists._id}
                return res.status(200).json({message: "User loggedin successfully", "token": jwtToken, "userInfo": userInfo});
            }
            else{
                return res.status(401).json({error: "Invalid Credentials"});
            }
            
            })
        .catch((error)=>{
                console.log('error',error);
            })
        })
    .catch((error)=>{
            console.log('error',error);
        })
})

router.put("/edit", protectedRoute, (req,res)=>{
    const {email, password, firstName, lastName, id} = req.body;
    console.log(id)
    userModel.find({email,"_id":{$ne: id}})
    .then((user)=>{
        if(user.length){
            return res.status(500).json({error: "Your updated email id already exists in the database",user:user});
        }
        else{
            bcryptjs.hash(password, 16).then((hashedPass)=>{
            userModel.findOneAndUpdate({_id:id},
                { $set: {firstName: firstName, lastName: lastName, email: email, password: hashedPass }},
                {safe: true, new: true }
                ) .then((record) => {
                    return res.status(200).json({ message: "Your Profile is Updated", data: record });
                })
                .catch((error) => {
                    return res.status(500).json({ message: "Server Error" });
                });
        }).catch((error)=>{
            console.log('error',error);
        })
        }

    
    })
    
})

module.exports = router;