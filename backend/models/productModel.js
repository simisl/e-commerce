const mongoose = require('mongoose');
// const userModel = mongoose.model("userModel")

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required:true

    },
    gender:{
        type: String,
        required:true
    },
    productPrice:{
        type: Number,
        required:true
    },
    createtime:{
        type: Date,
        required:true
    },
    productPic:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true

    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    review:[{
        reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
        comment: String,
        rating: Number,
        date: String
    }]
})

productSchema.index({"productName":"text","category":"text"});
mongoose.model("productModel", productSchema);