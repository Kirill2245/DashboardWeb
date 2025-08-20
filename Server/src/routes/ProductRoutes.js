const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');

router.post('/addproduct/:userId', ProductController.addProduct);
router.delete('/delateproduct', ProductController.dealateProduct);
module.exports =  router