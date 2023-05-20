const express = require('express');
var app = express();
const mongoose = require('mongoose');
const {mongo_url} = require('./config/config');
const cors = require("cors");
app.use(cors());
app.use(express.json());

require('./models/userModel');
app.use(require('./routes/userRoutes'));

require('./models/productModel');
app.use(require('./routes/productRoutes'));

require('./models/orderModel');
app.use(require('./routes/orderRoutes'));

const productModel = mongoose.model("productModel");
const userModel = mongoose.model("userModel");
const orderModel = mongoose.model("orderModel");


mongoose.connect(mongo_url);
mongoose.connection.on('connected',()=>{
    console.log('Database connected');
})
mongoose.connection.on('error',()=>{
    console.log('Database is not connected');
})


//seed product list
const seedProducts = [
    { productName:"White shirt", quantity:12, gender:"men", category:"Shirt", productPrice:1200, createtime: new Date(), productPic:"https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80", description: "Regular Machine Wash Short Sleeve"},
    { productName:"Red shirt", quantity:10, gender:"men", category:"Shirt", productPrice:800, createtime: new Date(), productPic:"https://images.unsplash.com/photo-1608976989382-d913f97920c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", description: "Box printed logo on the back Machine Wash"},
    { productName:"Black shirt", quantity:5, gender:"men", category:"Shirt", productPrice:500, createtime: new Date(), productPic:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80", description: "Box printed logo on the back Machine Wash"},
    { productName:"pink shirt", quantity:3, gender:"men", category:"Shirt", productPrice:800, createtime: new Date(), productPic:"https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", description: "Box printed logo on the back Machine Wash"},
    
    { productName:"Red Pant", quantity:2, gender:"women", category:"Pant", productPrice:800, createtime: new Date(), productPic:"https://images.unsplash.com/photo-1590159983013-d4ff5fc71c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80", description: "Box printed logo on the back Machine Wash"},
    { productName:"Black Pant", quantity:8, gender:"men", category:"Pant", productPrice:800, createtime: new Date(), productPic:"https://plus.unsplash.com/premium_photo-1663036350054-72e9a2bd4ed8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80", description: "Box printed logo on the back Machine Wash"},
    { productName:"Pink Pant", quantity:12, gender:"women", category:"Pant", productPrice:800, createtime: new Date(), productPic:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", description: "Crafted with Extra care Cotton" },
    { productName:"Jeans", quantity:10, gender:"men", category:"Pant", productPrice:800, createtime: new Date(), productPic:"https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", description: "Ultra Soft Feel 100% Cotton" }
]

//seed users list
const seedUsers = [
    { firstName:"Varun", lastName:"Sai", email:"varun@gmail.com", password:"111" },
    { firstName:"Manu", lastName:"Singh", email:"manu@gmail.com", password:"111" },
    { firstName:"Krishna", lastName:"Var", email:"krishna@gmail.com", password:"111" },
    { firstName:"Athil", lastName:"Jai", email:"athil@gmail.com", password:"111" }
]

//for seeding products into the database when the server starts
const seedProdDB = async () =>{
    await productModel.deleteMany({}); //reset the product collection
    await productModel.insertMany(seedProducts).then((result)=>{
        console.log('Product seeding completed')
    }).catch((err)=>{
        console.log(err)
    })
}
seedProdDB().then((result)=>{
    console.log('Products inserted')
}).catch((err)=>{
    console.log(err)
})


//for seeding users into the database when the server starts
const seedUseDB = async () =>{
    await userModel.deleteMany({}); //reset the user collection
    await userModel.insertMany(seedUsers).then((result)=>{
        console.log('User seeding completed')
    }).catch((err)=>{
        console.log(err)
    })
}
seedUseDB().then((result)=>{
    console.log('Users inserted')
}).catch((err)=>{
    console.log(err)
})



app.listen(4000, () =>{
    console.log("server started");
})