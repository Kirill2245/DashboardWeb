const Users = require('../models/Users');
const Task = require('../models/Task');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const index = (req, res) => {
    Users.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => { 
        res.json({
            message: `Error on ${error}`
        })
    })
}//Для удобства 

const signUp = async (req, res) => {
    try {
        const { name, fullName, email, password } = req.body;
            console.log('Registration attempt:', { email, password });

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            console.log('Email already exists:', email);
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new Users({ name, fullName, email, password });
        await user.save();
        console.log('User created:', { id: user._id, email: user.email });

        res.status(201).json({
            message: 'User created successfully',
            user: { id: user._id, email: user.email }
        });
    } 
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Error creating user', 
            error: error.message 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
            res.json({ message: 'Login successful', user: { id: user._id, email: user.email } 
        });} 
    catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

const deleteAllUsers = async (res) => {
    try {
        const result = await Users.deleteMany({});
        
        console.log(`Удалено пользователей: ${result.deletedCount}`);
        
        res.status(200).json({
            message: 'All users deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({
            message: 'Failed to delete users',
            error: error.message
        });
    }
};//Для удобства 

const getTask = async (req, res) => {
    try {
        const { userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required in request body' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await Users.findById(userId).select('taskList');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.taskList || user.taskList.length === 0) {
            return res.status(200).json({ 
                message: 'User has no tasks',
                tasks: []
            });
        }

        const tasks = await Task.find({
            _id: { $in: user.taskList }
        });

        return res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        return res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

const getProduct = async (req, res) => {
    try{
        const { userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required in request body' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await Users.findById(userId).select('productList');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.productList || user.productList.length === 0) {
            return res.status(200).json({ 
                message: 'User has no tasks',
                product: []
            });
        }

        const product = await Product.find({
            _id: { $in: user.productList }
        });

        return res.status(200).json({ product });
    }
    catch(error){
        console.error('Error fetching products:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Server error while fetching products',
            error: error.message 
        });
    }
};

module.exports = {
    index, signUp, login, deleteAllUsers, getTask, getProduct
}