const express = require('express');
const router = express.Router();
const messageRoutes = require('./messageRoutes');
const roomRoutes = require('./roomRoutes');

router.use('/api/chat', messageRoutes);
router.use('/api/chat', roomRoutes);

module.exports = router;