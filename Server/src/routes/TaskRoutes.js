const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskControllers');

router.post('/addtask', TaskController.addTask);
router.delete('/delatetask', TaskController.deleteTask);
router.post('/updateTask', TaskController.updateTask);
router.post('/liketask', TaskController.likeTask);

module.exports =  router