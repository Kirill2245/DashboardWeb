const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskControllers');

router.post('/addtask/:userId', TaskController.addTask);
router.patch('/updatestatus/:taskId', TaskController.updateStatusTask)
router.delete('/deletetask/:taskId', TaskController.deleteTask)

module.exports =  router