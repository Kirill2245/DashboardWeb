const Users = require('../models/Users');
const mongoose = require('mongoose');
const Event = require('../models/Event');

exports.CreateEvent = async(req,res) => {
    try{
        const {userId} = req.params;
        const {title, date, startTime, endTime, userList, location} = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({
                success:false,
                message:'Invalid user ID format',
            })
        }
        const user = await Users.findById(userId)
        if (!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        if (!title || !date ){
            return res.status(400).json({
                success:false,
                message:"Missing required fields"
            })
        }
        let parsedUserList = [];
        if (userList) {
            try {
                parsedUserList = typeof userList === 'string' 
                    ? JSON.parse(userList) 
                    : userList;
                if (!Array.isArray(parsedUserList)) {
                    return res.status(400).json({
                        success: false,
                        error: 'Invalid userList format',
                        details: 'userList must be an array'
                    });
                }
            } catch (parseError) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid userList format',
                    details: 'userList must be a valid JSON array'
                });
            }
        }

        let participantIds = [userId]; 

        if (parsedUserList && parsedUserList.length > 0) {
            if (!Array.isArray(userList)) {
                return res.status(400).json({
                    success: false,
                    message: 'userList must be an array'
                });
            }
            for (const userIdFromList of userList) {
                if (mongoose.Types.ObjectId.isValid(userIdFromList)) {
                    const userExists = await Users.findById(userIdFromList);
                    if (userExists) {
                        participantIds.push(userIdFromList);
                    }
                }
            }

            participantIds = [...new Set(participantIds)];
        }

        const eventData = {
            title: title,
            date: date,
            startTime: startTime,
            endTime: endTime,
            userList: participantIds,
            location: location,
            owner: userId
        };

        const newEvent = await Event.create(eventData);

        const updatePromises = participantIds.map(userId => 
            Users.findByIdAndUpdate(
                userId,
                { 
                    $addToSet: { 
                        scheduleList: { 
                            itemType: "Event", 
                            itemId: newEvent._id 
                        } 
                    } 
                }
            )
        );
        await Promise.all(updatePromises);
        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            result: newEvent
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`Interval server error - ${error}`,
        })
    }
} 