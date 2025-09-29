const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currentDate = new Date();

const TaskSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    tags:{
        type: String
    },
    status:{
        type:String,
        default:"Pending"
    },
    startTime: {
        type: String,  
        default: '12:00'
    },
    endTime: {
        type: String,
        default: '13:00'
    },
    memberList:{
        type: Array,
        default: []
    },    
    date:{
        type:Date,
        require:true,
        default:currentDate
    },
    likeCount:{
        type: Number,
        default: 0
    },
    location:{
        type:String
    },
    image:{
        type:String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true 
    }
});

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task