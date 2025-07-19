const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersControllers');

router.get('/', UsersController.index);
router.post('/signup', UsersController.signUp);
router.post('/login', UsersController.login);
router.delete('/delete-all', UsersController.deleteAllUsers);
router.post('/gettask', UsersController.getTask);
router.post('/getproduct', UsersController.getProduct);

module.exports =  router