const express = require('express');
const router = express.Router();
const CustomerControllers = require('../controllers/CustomerControllers')

router.post('/addcustomer', CustomerControllers.addCustomer);

module.exports = router