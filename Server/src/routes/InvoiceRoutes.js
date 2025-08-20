const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/InvoiceControllers')

router.post('/addinvoice', InvoiceController.addInvoice);
router.delete('/deleteinvoice/:idInvoice', InvoiceController.deleteInvoice);
router.patch('/updateInvoice/:idInvoice', InvoiceController.updateInvoice);
router.patch('/electInvoice/:idInvoice', InvoiceController.electInvoice);
module.exports = router 