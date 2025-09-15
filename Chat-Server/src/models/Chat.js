const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    }
});

module.exports = mongoose.model('Chat', ChatSchema);