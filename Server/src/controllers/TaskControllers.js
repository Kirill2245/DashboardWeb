const Users = require('../models/Users');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const upload = require('../settings/uploadConfig');
const fs = require('fs');
const path = require('path');
exports.addTask = async(req,res) => {
    try{
        await new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        const {userId} = req.params;
        const {title, date, description, tags, startTime, endTime,  memberList, location} = req.body
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
        if (!title ){
            return res.status(400).json({
                success:false,
                message:"Missing required fields"
            })
        }
        let parsedUserList = [];
        if (memberList) {
            try {
                parsedUserList = typeof memberList === 'string' 
                    ? JSON.parse(memberList) 
                    : memberList;
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
            if (!Array.isArray(parsedUserList)) {
                return res.status(400).json({
                    success: false,
                    message: 'userList must be an array'
                });
            }
            for (const userIdFromList of parsedUserList) {
                if (mongoose.Types.ObjectId.isValid(userIdFromList)) {
                    const userExists = await Users.findById(userIdFromList);
                    if (userExists) {
                        participantIds.push(userIdFromList);
                    }
                }
            }

            participantIds = [...new Set(participantIds)];
        }
        const taskData = {
            title: title,
            date: date,
            description:description,
            startTime: startTime,
            endTime: endTime,
            memberList: participantIds,
            location: location,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            tags:tags,
            owner: userId
        };
        const newTask = await Task.create(taskData);
    
        const updatePromises = participantIds.map(userId => 
            Users.findByIdAndUpdate(
                userId,
                { 
                    $addToSet: { 
                        scheduleList: { 
                            itemType: "Task", 
                            itemId: newTask._id 
                        } 
                    } 
                }
            )
        );
        await Promise.all(updatePromises);
        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            result: newTask
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`Interval server error - ${error}`
        })
    }
}
exports.updateStatusTask = async(req, res) => {
    try{
        const {taskId} = req.params
        const {status} = req.body

        if (!status || !taskId){
            return res.status(400).json({
                success:false,
                message:'Missing required fields'
            })
        }
        const validStatuses = ['Done', 'Running', 'Pending', 'Review'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status format',
            })
        }
        if (!mongoose.Types.ObjectId.isValid(taskId)){
            return res.status(400).json({
                success:false,
                message:'Invalid task ID format',
            })
        }
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({
                success:false,
                message:'Task not found'
            })
        }
        task.status = status
        await task.save()
        return res.status(200).json({
            success: true,
            message: 'Task status updated successfully',
            result: task
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`Interval server error - ${error}`
        })
    }
}
exports.deleteTask = async(req,res) => {
    try{
        const {taskId} = req.params
        if (!mongoose.Types.ObjectId.isValid(taskId)){
            return res.status(400).json({
                success:false,
                message:'Invalid task ID format',
            })
        }
        
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({
                success:false,
                message:'Task not found'
            })
        }
        
        const taskImage = task.image;
        
        await Task.findByIdAndDelete(taskId)
        if (taskImage) {
            const imagePath = path.join(__dirname, '../../public', taskImage);
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                    console.log('Image file deleted successfully:', taskImage);
                } else {
                    console.log('Image file not found:', imagePath);
                }
            } catch (err) {
                console.error('Error deleting image file:', err);
            }
        } else {
            console.log('No image to delete');
        }
        const result = await Users.updateMany(
            { 
                "scheduleList.itemType": "Task",
                "scheduleList.itemId": taskId
            },
            {
                $pull: {
                    scheduleList: {
                        itemType: "Task",
                        itemId: taskId
                    }
                }
            }
        );
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        })
    }
    catch(error){
        console.error('Error deleting task:', error);
        res.status(500).json({
            success:false,
            message: 'Internal server error'            
        })
    }
}