const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productModel = mongoose.model("productModel");
const protectedRoute = require('../middleware/protectedRoute');



router.post("/addProduct", protectedRoute, (req, res) => {
  let createtime = new Date(); 
  const { productName, gender, productPrice, productPic, category, description, quantity} = req.body
  const product = new productModel ({ productName, gender, productPrice, createtime, productPic, category, description, quantity}) ;
  productModel.find({ productName: { '$regex': productName, $options: 'i' } })
  .then((pd)=>{
    
    if(pd.length){
      return res.status(400).json({message: "Product with the same name already exists in the database. Please add a new product"});
    }
    else{
      product.save()
      .then((newProduct)=>{
          return res.status(200).json({message: "Product added successfully"});
      })
      .catch((error)=>{
          console.log('error',error);
      })
    }
  })
 
  
    
});

router.delete("/deleteReview/:productId/:reviewId",protectedRoute, (req,res)=>{
  const reviewData = {_id: req.params.reviewId}
  const productId = req.params.productId ;
  productModel.findByIdAndUpdate(productId, {
    $pull : { review: reviewData}
  }, { new: true }
  )
  .then((result)=>{
    if(result){
      return res.status(200).json({message:"Review Deleted Successfully"})
    } 
  })
  .catch((error)=>{
      console.log('Error',error);
  })
})

router.put("/editReview/:productId/:reviewId",protectedRoute, (req,res)=>{
  const reviewId = req.params.reviewId
  const reviewData = {reviewedBy: req.user._id, comment: req.body.comment, rating: req.body.rating, date: req.body.date} 
  
  const productId = req.params.productId ;
  productModel.findOneAndUpdate({_id:productId, "review._id":reviewId},{
    $set : { "review.$": reviewData}
  }, { new: true }
  ).populate("review.reviewedBy", "_id firstName")
  .then((result)=>{
    console.log('res1',result)
    if(result){
      console.log('res',result)
      return res.status(200).json({message:"Review Edited Successfully"})
    } 
  })
  .catch((error)=>{
      console.log('Error',error);
  })
})

//to edit a product

router.put("/editProduct/:productId", (req,res)=>{
  const productId = req.params.productId
  console.log('res1',productId,req.body)
  const productData = {
      productName: req.body.productName, 
      gender: req.body.gender, 
      productPrice: req.body.productPrice, 
      productPic: req.body.productPic, 
      category: req.body.category, 
      description: req.body.description,
      quantity: req.body.quantity
    } 
  productModel.findByIdAndUpdate({"_id":productId},{
    $set : productData 
  }, { new: true }
  )
  .then((result)=>{
    console.log('res1',result)
    if(result){
      console.log('res',result)
      return res.status(200).json({message:"Product Edited Successfully"})
    } 
  })
  .catch((error)=>{
      console.log('Error',error);
  })
})

router.put("/productReview/:id", protectedRoute, (req,res)=>{
  console.log("USER",req.user)
  const reviewData = {reviewedBy: req.user._id, comment: req.body.comment, rating: req.body.rating, date: req.body.date} 
  const id = req.params.id;
  productModel.findByIdAndUpdate(id, {
    $push : { review: reviewData}
  }, { new: true }
  ).populate("review.reviewedBy", "_id firstName")
  .then((result)=>{
    if(result){
      return res.status(200).json({message:"Review Saved Successfully"})
    } 
  })
  .catch((error)=>{
      console.log('Error',error);
  })
})

//to list the featured products

router.get("/allProducts", (req, res) => {
  productModel
    .find({}, {review:0}).sort({createtime: -1})
    
    .then((sales) => {
      return res.status(200).json(sales);
    })
    .catch((error) => {
      console.log("error", error);
    });
});



//to get the products based on gender

router.get("/gender/:name",  (req, res) => {
  const name = req.params.name;
  productModel
    .find({gender:{$eq: name}})
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((error) => {
      console.log("error", error);
    });
});

//to get the products based on gender and category

router.get("/category/:cat/:name",  (req, res) => {
  const cat = req.params.cat;
  const name = req.params.name;
  productModel
    .find({category:{$eq: cat}, gender:{$eq: name}})
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((error) => {
      console.log("error", error);
    });
});




//to get the products based on id

router.get("/product/:id/:userId", (req,res)=>{
  const id = req.params.id;
  const userId = req.params.userId;
  console.log('id',req.params.id, userId)
  let filter = {};
  if(userId){
    filter = {"review.reviewedBy._id":{$ne:userId}}
  }
  
  productModel.findById(id)
  .populate(
     "review.reviewedBy", "_id firstName"
)
  .then((product)=>{
      if(product){
          return res.status(200).json(product);
      }
      else{
        return res.status(400).json({error:"product not found"});
      }
      
  })
  .catch((error)=>{
      console.log('Error',error);
  })
})

//to get the searched product

router.get("/searchProduct/:searchTerm", (req,res)=>{
  const searchTerm = req.params.searchTerm;
  console.log('id',searchTerm)
  productModel
    .find({productName:{$eq: searchTerm}})
    .then((products) => {
      if(products.length){
        return res.status(200).json(products);
      }
      else{
        productModel.find({
          $text: {
            $search: searchTerm
          }
        }).then(products=>{
          return res.status(200).json(products);
          })
          .catch((error) => {
            console.log("error", error);
        })
      }
      
    })
    .catch((error) => {
      console.log("error", error);
    });

  
  
    
})



module.exports = router;
