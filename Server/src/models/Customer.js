const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email: {
        type: String
    },
    phoneNumber:{
        type: String
    },
    gender:{
        type: String
    },
    image:{
        type:String
    },
})

const Customer = mongoose.model('Customer', CustomerSchema)
module.exports = Customer