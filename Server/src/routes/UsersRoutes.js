const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersControllers')

router.get('/', UsersController.index)
router.post('/signup', UsersController.signUp)


module.exports =  router