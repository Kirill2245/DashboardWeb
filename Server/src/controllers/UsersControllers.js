const Users = require('../models/Users')


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
}
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
const deleteAllUsers = async ( res) => {
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
};
module.exports = {
    index, signUp, login, deleteAllUsers
}