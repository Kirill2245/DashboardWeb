const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        require:true
    },
    startTime: {
        type: String,  
        default: '12:00'
    },
    endTime: {
        type: String,
        default: '13:00'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true 
    }
})

module.exports = mongoose.model('Reminder', ReminderSchema)