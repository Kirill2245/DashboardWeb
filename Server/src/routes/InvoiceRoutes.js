const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/InvoiceControllers')

router.post('/addinvoice', InvoiceController.addInvoice);
router.delete('/delateinvoice', InvoiceController.delateInvoice);
module.exports = router