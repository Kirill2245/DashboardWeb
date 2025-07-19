const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currentDate = new Date();

const ProductSchema = new Schema({
    name:{
        type:String
    },
    brand:{
        type:String
    },
    price:{
        type:mongoose.Types.Decimal128,
        required: true,
        validate: {
            validator: v => v >= 0,
            message: 'Price cannot be negative'
        }
    },
    negotiable:{
        type:Boolean,
        default:false
    },
    descriptions:{
        type:String
    },
    image:{
        type:String
    },
    numberSales:{
        type:Number,
        default:0
    },
    numberOrders:{
        type:Number,
        default:0
    },
    numberCancel:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:currentDate
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true 
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product