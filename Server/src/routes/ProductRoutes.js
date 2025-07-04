const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');

router.post('/addproduct', ProductController.addProduct);

module.exports =  router