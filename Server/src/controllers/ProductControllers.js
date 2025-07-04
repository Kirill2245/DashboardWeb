const mongoose = require('mongoose');
const Users = require('../models/Users');
const Product = require('../models/Product');
const upload = require('../settings/uploadConfig');

const addProduct = async (req, res) => {
    try {
        upload.single('image')(req, res, async function(err) {
        // 1. Обработка ошибок загрузки файла
        if (err) {
            return res.status(400).json({ 
            success: false,
            error: err.message,
            type: 'FILE_UPLOAD_ERROR'
            });
        }

        // 2. Логирование входящих данных для отладки
        console.log('Received data:', {
            body: req.body,
            file: req.file ? req.file.filename : 'No file uploaded'
        });

        // 3. Деструктуризация с проверкой
        const { name, brand, price, negotiable, descriptions, userId } = req.body;

        // 4. Валидация полей
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

        // 5. Проверка формата данных
        const validationErrors = {};
        
        // Проверка price
        const priceValue = parseFloat(price);
        if (isNaN(priceValue)) {
            validationErrors.price = 'Must be a valid number';
        }

        // Проверка userId
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

        // 6. Проверка существования пользователя
        const userExists = await Users.exists({ _id: userId });
        if (!userExists) {
            return res.status(404).json({
            success: false,
            error: 'User not found'
            });
        }

        // 7. Создание продукта
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
        
        // 8. Обновление пользователя
        await Users.findByIdAndUpdate(
            userId,
            { $addToSet: { productList: newProduct._id } }
        );

        // 9. Форматирование ответа
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

module.exports = { addProduct };