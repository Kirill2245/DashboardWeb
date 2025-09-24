const express = require('express');
const router = express.Router();
const EventControllers= require('../controllers/EventControllers')

router.post('/addevent/:userId', EventControllers.CreateEvent);
module.exports = router 