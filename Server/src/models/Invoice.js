const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    nameId:{
        type:String
    },
    name:{
        type:String
    },
    email: {
        type: String
    },
    date:{
        type:Date
    },
    address:{
        type:String
    },
    productList:{
        type:[{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            count:{
                type:Number
            }
        }]
    },
    image:{
        type:String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true 
    },
    status:{
        type:String,
        default:"Pending"
    }
})

const Invoice = mongoose.model('Invoice', InvoiceSchema)
module.exports = Invoice