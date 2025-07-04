const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currentDate = new Date();

const TaskSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    tags:{
        type: [String], 
        default: []
    },
    status:{
        type:String,
        default:"Pending"
    },
    startDate:{
        type:Date,
        default:currentDate
    },
    endDate:{
        type:Date,
    },
    memberList:{
        type: Array,
        default: []
    },
    likeCount:{
        type: Number,
        default: 0
    }
});

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task