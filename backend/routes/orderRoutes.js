const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const orderModel = mongoose.model("orderModel");
const protectedRoute = require('../middleware/protectedRoute');

router.post("/saveOrder", protectedRoute, (req, res) => {
    let createtime = new Date(); 
    const { id, total, date, paid, delivered, product, address } = req.body
    const order = new orderModel ({ id, total, date, paid, delivered, product, address, createtime }) ;
    order.save()
              .then((newOrder)=>{
                  return res.status(200).json({message: "Order added successfully"});
              })
              .catch((error)=>{
                  console.log('error',error);
              })
      
  });

  router.get("/order/:id", (req,res)=>{
    const id = req.params.id;
    orderModel.findById(id)
    .then((product)=>{
        if(product){
            return res.status(200).json(product);
        }
        else{
          return res.status(400).json({error:"order not found"});
        }
        
    })
    .catch((error)=>{
        console.log('Error',error);
    })
  })

  router.get("/allOrders", (req, res) => {
    orderModel
      .find({},{address: 0, product: 0})
      .then((orders) => {
        return res.status(200).json(orders);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });

  module.exports = router;