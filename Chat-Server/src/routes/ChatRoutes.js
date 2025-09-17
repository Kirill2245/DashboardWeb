const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController')

router.post('/search/:userId', ChatController.searchChat);


module.exports = router;