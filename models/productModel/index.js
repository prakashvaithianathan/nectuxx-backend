const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    SKU:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    availableQty:{
        type:Number,
        required:true
    }
    
},
{
    timestamps:true
})

const productModel = mongoose.model('products',productSchema)

module.exports=productModel