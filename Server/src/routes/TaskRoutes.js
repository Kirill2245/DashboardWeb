const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskControllers');

router.post('/addtask/:userId', TaskController.addTask);

module.exports =  router