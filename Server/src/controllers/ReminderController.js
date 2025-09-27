const Users = require('../models/Users');
const mongoose = require('mongoose');
const Reminder = require('../models/Reminder');

exports.addReminder = async(req, res) => {
    try{
        const {userId} = req.params;
        const {title, date, startTime, endTime} = req.body;
        if (!title || !date){
            return res.status(400).json({
                success:false,
                message:'Missing required fields'
            })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({
                success:false,
                message:'Invalid user ID format',
            })
        }
        const user = await Users.findById(userId)
        if (!user){
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }
        const reminder = {
            title,
            date,
            startTime,
            endTime,
            owner:userId
        }
        const newReminder = await Reminder.create(reminder)
        await Users.findByIdAndUpdate(
            userId,
            {$addToSet: {scheduleList: { 
                            itemType: "Reminder", 
                            itemId: newReminder._id 
                        } 
                    }}
        )
        res.status(200).json({
            success:true,
            message:'Reminder create successfully!!!',
            result:newReminder
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message: `Interval server error - ${error}`
        })
    }
}