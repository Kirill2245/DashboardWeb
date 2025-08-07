const mongoose = require('mongoose');
const Users = require('../models/Users');
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const upload = require('../settings/uploadConfig');
const fs = require('fs');
const path = require('path');

const addInvoice = async (req, res) => {
    try{
        upload.single('image')(req, res, async function(err){
            if(err){
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

            const {nameId, name, email, date, address, productId,countProduct, userId} = req.body;

            const validationErrors = {};
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
            const productList = {
                productId:productId,
                count:countProduct
            }
            const InvoiceData = {
                nameId,
                name,
                email,
                date,
                address,
                productList,
                owner: userId,
                image: req.file ? `/uploads/${req.file.filename}` : null
            }
            const newInvoice = await Invoice.create(InvoiceData)
            await Users.findByIdAndUpdate(
                userId,
                { $addToSet: { invoiceList: newInvoice._id } }
            );
            return res.status(201).json({
                success: true,
                product: newInvoice
            });

        })
    }
    catch (error) {
        console.error('Invoice creation error:', error);
        return res.status(500).json({
        success: false,
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { 
            details: error.message,
            stack: error.stack 
        })
        });
    }
}
const delateInvoice = async (req, res) => {
    try {
        const { idInvoice } = req.body;

        if (!mongoose.Types.ObjectId.isValid(idInvoice)) {
            return res.status(400).json({ message: 'Invalid invoice ID format' });
        }
        const deletedInvoice = await Invoice.findOneAndDelete({ _id: idInvoice });
        
        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        if (deletedInvoice.image) {
            const imagePath = path.join(__dirname, '../../public', deletedInvoice.image);
            try {
                fs.unlinkSync(imagePath);
                console.log('Image file deleted successfully:', deletedInvoice.image);
            } catch (err) {
                console.error('Error deleting image file:', err);
            }
        }

        const updateResult = await Users.updateMany(
            { invoiceList: idInvoice }, 
            { $pull: { invoiceList: idInvoice } }
        );

        res.status(200).json({
            message: `Invoice deleted and removed from ${updateResult.modifiedCount} users`,
            deletedInvoice
        });

    } catch (error) {
        console.error('Error deleting invoice:', error);
        
        if (req.file) {
            try {
                const filePath = path.join(__dirname, '../public', req.file.path);
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error('Error deleting temp file:', err);
            }
        }

        res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
};

const updateInvoice = async(req, res) => {
    try {
        const { idInvoice, status } = req.body;

        if (!idInvoice || !mongoose.Types.ObjectId.isValid(idInvoice)) {
            return res.status(400).json({ 
                message: 'Invalid or missing invoice ID'
            });
        }

        const invoice = await Invoice.findById(idInvoice);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        invoice.status = status;
        await invoice.save();

        if (status === "Complete") {
            for (const item of invoice.productList) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    console.error(`Product ${item.productId} not found`);
                    continue; 
                }
                product.numberOrders += item.count;
                product.salesInfo.push({
                    count: item.count,
                    dateSales: new Date()
                });
                await product.save();
            }
        } else if (status === "Cancel") {
            for (const item of invoice.productList) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    console.error(`Product ${item.productId} not found`);
                    continue; 
                }
                product.numberCancel += item.count;
                await product.save();
            }
        }

        res.json({
            success: true,
            invoice: invoice,
            message: `Invoice ${status.toLowerCase()} successfully`
        });

    } catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};
module.exports = {addInvoice, delateInvoice, updateInvoice}