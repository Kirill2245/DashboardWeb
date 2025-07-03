const Users = require('../models/Users');
const Task = require('../models/Task');
const mongoose = require('mongoose');

const addTask = async (req, res) => {
    try {
        const { name, description, tags, status, startDate, endDate, memberList, likeCount, userId } = req.body;
        const task = new Task({
            name,
            description,
            tags,
            status,
            startDate,
            endDate,
            memberList,
            likeCount
        });
        const savedTask = await task.save();
        await Users.updateOne(
            { _id: userId },  
            { $push: { taskList: savedTask._id } }
        );
        res.status(201).json({
            message: 'Task created successfully',
            task: savedTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body; 

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }

        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Users.updateMany(
            { taskList: taskId },
            { $pull: { taskList: taskId } }
        );

        res.status(200).json({
            message: 'Task deleted and removed from all users',
            deletedTask
        });
    } 
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
    });
    }
};

const updateTask = async (req, res) => {
    try {
        const { idTask, ...updateData } = req.body; 

        if (!idTask || !mongoose.Types.ObjectId.isValid(idTask)) {
            return res.status(400).json({ 
                message: 'Invalid or missing task ID'
            });
        }

        if (updateData.likeCount !== undefined) {
            delete updateData.likeCount;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            idTask,
            updateData,
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!updatedTask) {
            return res.status(404).json({ 
                message: 'Task not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Task updated successfully',
            data: updatedTask
        });

    } catch (error) {
        console.error('Error updating task:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(422).json({
                status: 'error',
                message: 'Validation failed',
                details: error.errors
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const likeTask = async (req, res) => {
    const { idTask } = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(
        idTask,
        { $inc: { likeCount: 1 } }, 
        { new: true }
    );
    
    res.json(updatedTask);
};

module.exports = {
    addTask, deleteTask, updateTask, likeTask
}