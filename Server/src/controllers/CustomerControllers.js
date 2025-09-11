const Users = require('../models/Users');
const Customer = require('../models/Customer');
const upload = require('../settings/uploadConfig');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const addCustomer = async (req, res) => {
    try {

        await new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        const { firstName, lastName, email, phoneNumber, gender } = req.body;
        const {userId} = req.params;

        const errors = {};
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            errors.userId = 'Invalid user ID format';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                errors
            });
        }


        const userExists = await Users.exists({ _id: userId });
        if (!userExists) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }


        const customer = {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            owner:userId,
            image: req.file ? `/uploads/${req.file.filename}` : null
        };

        const newCustomer = await Customer.create(customer);


        await Users.findByIdAndUpdate(
            userId,
            { $addToSet: { customerList: newCustomer._id } }
        );

        return res.status(201).json({
            success: true,
            customer: newCustomer
        });

    } catch (error) {
        console.error('Customer creation error:', error);
        if (req.file) {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.join(__dirname, '../public', req.file.path);
            fs.unlink(filePath, () => {});
        }

        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};
const delateCustomer = async (req, res) => {
    try{
        const {customerId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(customerId)){
            return res.status(400).json({
                success:false,
                message:'Invalid customer Id format',
            })
        }
        const result = await Customer.findByIdAndDelete(customerId);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Server error', 
            error: error.message
        })
    }
}
module.exports = {addCustomer, delateCustomer}