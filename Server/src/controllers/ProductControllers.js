const mongoose = require('mongoose');
const Users = require('../models/Users');
const Product = require('../models/Product');
const upload = require('../settings/uploadConfig');
const fs = require('fs');
const path = require('path');

const addProduct = async (req, res) => {
    try {
        upload.single('image')(req, res, async function(err) {

            if (err) {
                return res.status(400).json({ 
                    success: false,
                    error: err.message,
                    type: 'FILE_UPLOAD_ERROR'
                });
            }


            console.log('Received data:', {
                body: req.body,
                file: req.file ? req.file.filename : 'No file uploaded'
            });


            const { name, brand, price, negotiable, descriptions } = req.body;
            const { userId } = req.params;
            const missingFields = [];
            if (!name) missingFields.push('name');
            if (!brand) missingFields.push('brand');
            if (!price) missingFields.push('price');
            if (!userId) missingFields.push('userId');

            if (missingFields.length > 0) {
                return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                missingFields,
                receivedData: req.body
                });
            }


            const validationErrors = {};
            
            const priceValue = parseFloat(price);
            if (isNaN(priceValue)) {
                validationErrors.price = 'Must be a valid number';
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                validationErrors.userId = 'Invalid user ID format';
            }

            if (Object.keys(validationErrors).length > 0) {
                return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationErrors
                });
            }

            const userExists = await Users.exists({ _id: userId });
            if (!userExists) {
                return res.status(404).json({
                success: false,
                error: 'User not found'
                });
            }

            const productData = {
                name,
                brand,
                price: mongoose.Types.Decimal128.fromString(priceValue.toFixed(2)),
                negotiable: negotiable === 'true',
                descriptions,
                owner: userId,
                image: req.file ? `/uploads/${req.file.filename}` : null
            };

            const newProduct = await Product.create(productData);
            

            await Users.findByIdAndUpdate(
                userId,
                { $addToSet: { productList: newProduct._id } }
            );


            const responseData = {
                ...newProduct.toObject(),
                price: parseFloat(newProduct.price.toString())
            };

            return res.status(201).json({
                success: true,
                product: responseData
            });
        });
    } catch (error) {
        console.error('Product creation error:', error);
        return res.status(500).json({
        success: false,
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { 
            details: error.message,
            stack: error.stack 
        })
        });
    }
};

const dealateProduct = async (req, res) => {
    try{
        const {idProduct} = req.body;
        if (!mongoose.Types.ObjectId.isValid(idProduct)) {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }
        const product = await Product.findById(idProduct);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const deletedProduct = await Product.findByIdAndDelete(idProduct);

        if (product.image) {
            const imagePath = path.join(__dirname, '../../public', product.image);
            
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                } else {
                    console.log('Image file deleted successfully:', product.image);
                }
            });
        }

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await Users.updateMany(
            { productList: idProduct },
            { $pull: { productList: idProduct } }
        );

        res.status(200).json({
            message: 'Product deleted and removed from all users',
            deletedProduct
        });
    }
    catch (error){
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        })
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

module.exports = { addProduct, dealateProduct };