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
    taskList:{
        type: Array,
        default: []
    },
    friendList:{
        type: Array,
        default: []
    },
    invoiceList:{
        type: Array,
        default: []
    },
    eventList:{
        type: Array,
        default: []
    },
    chatList:{
        type: Array,
        default: []
    }
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