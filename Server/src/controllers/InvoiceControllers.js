const mongoose = require('mongoose');
const Users = require('../models/Users');
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const upload = require('../settings/uploadConfig');
const fs = require('fs');
const path = require('path');

const addInvoice = async (req, res) => {
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

            const { nameId, name, email, date, address, productList } = req.body;
            const { userId } = req.params;

            
            let parsedProductList = [];
            try {
                parsedProductList = typeof productList === 'string' 
                    ? JSON.parse(productList) 
                    : productList;
            } catch (parseError) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid productList format',
                    details: 'productList must be a valid JSON array'
                });
            }

            
            const formattedProductList = parsedProductList.map(product => ({
                productId: product.id, 
                count: product.count
            }));

            const validationErrors = {};
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                validationErrors.userId = 'Invalid user ID format';
            }

            
            if (!Array.isArray(formattedProductList)) {
                validationErrors.productList = 'Product list must be an array';
            } else {
                formattedProductList.forEach((product, index) => {
                    if (!product.productId) {
                        validationErrors[`productList[${index}].productId`] = 'Product ID is required';
                    } else if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                        validationErrors[`productList[${index}].productId`] = 'Invalid product ID format';
                    }
                    if (!product.count || product.count <= 0) {
                        validationErrors[`productList[${index}].count`] = 'Count must be a positive number';
                    }
                });
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

            
            for (const product of formattedProductList) {
                const productExists = await Product.exists({ _id: product.productId });
                if (!productExists) {
                    return res.status(404).json({
                        success: false,
                        error: `Product not found with ID: ${product.productId}`
                    });
                }
            }

            const InvoiceData = {
                nameId,
                name,
                email,
                date,
                address,
                productList: formattedProductList, 
                owner: userId,
                image: req.file ? `/uploads/${req.file.filename}` : null
            };

            const newInvoice = await Invoice.create(InvoiceData);


            for (const product of formattedProductList) {
                await Product.updateOne(
                    { _id: product.productId },
                    { $inc: { numberOrders: product.count } }
                );
            }

            await Users.findByIdAndUpdate(
                userId,
                { $addToSet: { invoiceList: newInvoice._id } }
            );

            return res.status(201).json({
                success: true,
                invoice: newInvoice,
                message: `Invoice created with ${formattedProductList.length} products`
            });
        });
    } catch (error) {
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
};

const deleteInvoice = async (req, res) => {
    try {
        const { idInvoice } = req.params;

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
            success: true,
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
    console.log(req.body)
    try {
        const { status } = req.body;
        const { idInvoice } = req.params;

        if (!idInvoice || !mongoose.Types.ObjectId.isValid(idInvoice)) {
            return res.status(400).json({ 
                message: 'Invalid or missing invoice ID'
            });
        }

        const invoice = await Invoice.findById(idInvoice);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        if (status === "Complete") {
            if (invoice.status === "Pending"){
                for (const item of invoice.productList) {
                    const product = await Product.findById(item.productId);
                    if (!product) {
                        console.error(`Product ${item.productId} not found`);
                        continue; 
                    }
                    product.numberOrders -= item.count;
                    product.salesInfo.push({
                        count: item.count,
                        dateSales: new Date()
                    });
                await product.save();
                }
            }else if(invoice.status === "Cancel"){
                for (const item of invoice.productList) {
                    const product = await Product.findById(item.productId);
                    if (!product) {
                        console.error(`Product ${item.productId} not found`);
                        continue; 
                    }
                    product.numberCancel -= item.count;
                    product.salesInfo.push({
                        count: item.count,
                        dateSales: new Date()
                    });
                await product.save();
                }
            }
            invoice.status = status;
            await invoice.save();
        } else if (status === "Cancel") {
            if (invoice.status === "Complete"){
                return res.status(409).json({ 
                    success: false,
                    error: 'Cannot cancel an invoice that is already completed.'
                });
            }
            else if (invoice.status === "Pending"){
                for (const item of invoice.productList) {
                    const product = await Product.findById(item.productId);
                    if (!product) {
                        console.error(`Product ${item.productId} not found`);
                        continue; 
                    }
                    product.numberCancel += item.count;
                    product.numberOrders -= item.count;
                    await product.save();
                }
            }
            invoice.status = status;
            await invoice.save();
        }
        else if (status === "Pending") {
            if (invoice.status === "Cancel"){
                for (const item of invoice.productList) {
                    const product = await Product.findById(item.productId);
                    if (!product) {
                        console.error(`Product ${item.productId} not found`);
                        continue; 
                    }
                    product.numberCancel -= item.count;
                    product.numberOrders += item.count;
                    await product.save();
                }
            }
            else if (invoice.status === "Complete"){
                return res.status(409).json({ 
                    success: false,
                    error: 'Cannot cancel an invoice that is already completed.'
                });
            }
            invoice.status = status;
            await invoice.save();
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

const electInvoice = async(req,res) => {
    try{
        const {idInvoice} = req.params
        if (!idInvoice || !mongoose.Types.ObjectId.isValid(idInvoice)) {
            return res.status(400).json({ 
                message: 'Invalid or missing invoice ID'
            });
        }

        const invoice = await Invoice.findById(idInvoice);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        invoice.elect = !invoice.elect
        await invoice.save()
        res.json({
            success: true,
            invoice: invoice,
            message: `Invoice successfully elect -- ${invoice.elect}`
        });
    }
    catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
}
module.exports = {addInvoice, deleteInvoice, updateInvoice, electInvoice}