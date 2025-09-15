const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    name: String,
    fullName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    taskList:{
        type: Array,
        default: []
    },
    friendList:{
        type: Array,
        default: []
    },
    invoiceList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }],
    eventList:{
        type: Array,
        default: []
    },
    chatList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    productList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    customerList:{
        type: Array,
        default: [],
        ref:'Customer'
    }
});

const Users = mongoose.model('User', UsersSchema)
module.exports = Users