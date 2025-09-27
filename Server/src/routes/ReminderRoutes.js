const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/ReminderController');

router.post('/addreminder/:userId', ReminderController.addReminder);
module.exports = router 