const Users = require('../models/Users');
const Task = require('../models/Task');
const Product = require('../models/Product');
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const Event = require('../models/Event');
const Reminder = require('../models/Reminder')
const mongoose = require('mongoose');
const { all } = require('axios');

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
            res.json({ message: 'Login successful', user: { id: user._id, email: user.email } , success: true
        });} 
    catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

const userAll = async (req, res) => {
    try{
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'ID is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const user = await Users.findById(userId);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({user: user , success: true})
    }
    catch(error){res.status(500).json({ message: 'Search failed', error: error.message });}
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
        const { userId } = req.params; 

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await Users.findById(userId).select('productList');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.productList || user.productList.length === 0) {
            return res.status(200).json({ 
                message: 'User has no product',
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

const getInvoice = async(req, res) => {
    const {userId} = req.params

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required in request body' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await Users.findById(userId).select('invoiceList');
        if (!user.invoiceList || user.invoiceList.length === 0) {
        return res.status(200).json({ 
            message: 'User has no product',
            invoice: []
        });
    }

    const invoice = await Invoice.find({
        _id: { $in: user.invoiceList }
    });

    return res.status(200).json(invoice);
}

const recentOrders = async(req, res) => {
    try{
        const {userId} = req.params
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        const user = await Users.findById(userId).select('invoiceList');
            if (!user.invoiceList || user.invoiceList.length === 0) {
            return res.status(404).json({ 
                success:false,
                message: 'User has no invoice'
            });
        }
        const invoice = await Invoice.find({
            _id: { $in: user.invoiceList }
        });
        if (invoice && invoice.length > 0){
            if(invoice[invoice.length - 1].productList.length > 0){
                const productIds = invoice[invoice.length - 1].productList.map(item => item.productId);
                const products = await Product.find({ _id: { $in: productIds } });
                return res.status(200).json({
                    success:true,
                    message:'Last orders is successfully :)',
                    products:products
                })
            }
            else{
                return res.status(404).json({
                    success: false,
                    message:'Products in invoice not found',
                })
            }
        }
        else{
            return res.status(404).json({
                success: false,
                message:'Invoice not found',
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message 
        })
    }
}

const getCustomer = async(req, res) => {
    try{
        const {userId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({
                success:false,
                message:'Invalid user ID format'
            })
        }
        const user = await Users.findById(userId).select('customerList')
        if (!user){
            return res.status(404).json({ 
                success:false,
                message: 'User not found' 
            });
        }
        if (!user.customerList|| user.customerList.length === 0) {
            return res.status(200).json({ 
                success:true,
                message: 'User has no customer',
                customers: []
            });
        }
        const customer = await Customer.find({
            _id: { $in: user.customerList }
        });

        return res.status(200).json({ 
            success:true,
            message:'Customer successfully',
            customers:customer
        });
    }
    catch(error){
        console.error('Error fetching customers:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Server error while fetching customers',
            error: error.message 
        });
    }
}

const getSchedule = async(req, res) => {
    try{
        const {userId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                success:false,
                message: 'Invalid user ID format' 
            });
        }
        const user = await Users.findById(userId)
        if (!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        if (!user.scheduleList || user.scheduleList.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Schedule is empty',
                result: []
            });
        }
        const events = user.scheduleList.filter(item => item.itemType === 'Event');
        const tasks = user.scheduleList.filter(item => item.itemType === 'Task');
        const reminders = user.scheduleList.filter(item => item.itemType === 'Reminder');

        const [eventData, taskData, reminderData] = await Promise.all([
            Event.find({ _id: { $in: events.map(e => e.itemId) } }),
            Task.find({ _id: { $in: tasks.map(t => t.itemId) } }),
            Reminder.find({ _id: { $in: reminders.map(r => r.itemId) } })
        ]);

        const eventMap = new Map(eventData.map(item => [item._id.toString(), item]));
        const taskMap = new Map(taskData.map(item => [item._id.toString(), item]));
        const reminderMap = new Map(reminderData.map(item => [item._id.toString(), item]));

        const result = user.scheduleList.map(item => {
            let data = null;
            
            switch(item.itemType) {
                case 'Event':
                    data = eventMap.get(item.itemId.toString()) || null;
                    break;
                case 'Task':
                    data = taskMap.get(item.itemId.toString()) || null;
                    break;
                case 'Reminder':
                    data = reminderMap.get(item.itemId.toString()) || null;
                    break;
            }

            return {
                scheduleItemId: item._id,
                itemType: item.itemType,
                data: data
            };
        });

        return res.status(200).json({
            success: true,
            message: 'Schedule retrieved successfully',
            result: result
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:`Invalid server error - ${error}`
        })
    }
}   
module.exports = {
    index, signUp, login, deleteAllUsers, getTask, getProduct, userAll, getInvoice, recentOrders, getCustomer, getSchedule
}