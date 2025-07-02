const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
        name:{
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    }
});

const Users = mongoose.model('User', UsersSchema)
module.exports = Users