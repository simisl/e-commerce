const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true

    },
    lastName:{
        type: String,
        required:true

    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    }

})

//for hashing the passwords when we use insertmany  records
userSchema.pre("insertMany", async function (next, docs) {
    if (Array.isArray(docs) && docs.length) {
        const hashedUsers = docs.map(async (user) => {
            return await new Promise((resolve, reject) => {
                bcrypt.genSalt(16).then((salt) => {
                    let password = user.password.toString()
                    bcrypt.hash(password, salt).then(hash => {
                        user.password = hash
                        resolve(user)
                    }).catch(e => {
                        reject(e)
                    })
                }).catch((e) => {
                    reject(e)
                })
            })
        })
        docs = await Promise.all(hashedUsers)
        next()
    } else {
        return next(new Error("User list should not be empty")) 
    }
})
mongoose.model("userModel", userSchema);