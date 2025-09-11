const express = require('express');
const router = express.Router();
const CustomerControllers = require('../controllers/CustomerControllers')

router.post('/addcustomer/:userId', CustomerControllers.addCustomer);
router.delete('/delatecustomer/:customerId',CustomerControllers.delateCustomer);
module.exports = router