const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date:{
        type: String,
        required:true

    },
    id:{
        type: String,
        required:true
    },
    total:{
        type: Number,
        required:true
    },
    createtime:{
        type: Date,
        required:true
    },
    paid:{
        type: String,
        required: true
    },
    delivered:{
        type: String,
        required: true
    },
    address: {
        name: String,
        add: String

    },
    product: [
        {
            category: String,
            description: String,
            id: String,
            name: String,
            pic: String,
            price: String,
            quantity: Number,
            totalPrice: Number
        }
    ]
    
})


mongoose.model("orderModel", orderSchema);