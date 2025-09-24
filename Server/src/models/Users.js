const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
    invoiceList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }],
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
    },
    scheduleList: [{
        itemType: {
            type: String,
            enum: ['Event', 'Task', 'Reminder'],  
            required: true
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'scheduleList.itemType'  
        }
    }]
});
UsersSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});


UsersSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const Users = mongoose.model('User', UsersSchema)
module.exports = Users