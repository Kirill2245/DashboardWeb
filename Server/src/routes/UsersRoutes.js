const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersControllers');

router.get('/', UsersController.index);
router.post('/signup', UsersController.signUp);
router.post('/login', UsersController.login);
router.delete('/delete-all', UsersController.deleteAllUsers);
router.post('/gettask', UsersController.getTask);
router.get('/getproduct/:userId', UsersController.getProduct);
router.get('/userall/:userId', UsersController.userAll);
router.get('/getinvoice/:userId', UsersController.getInvoice);
router.get('/recentorders/:userId', UsersController.recentOrders);
router.get('/getcustomers/:userId', UsersController.getCustomer);
module.exports =  router