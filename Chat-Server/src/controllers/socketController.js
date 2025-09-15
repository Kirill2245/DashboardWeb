const chatController = require('./chatController');
const User = require('../models/Users');

exports.handleConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('user-connected', (userId) => {
            console.log('User joined with ID:', userId);
            socket.userId = userId;
            socket.join(userId); 
        });

        socket.on('create-chat', async (data) => {
            try {
                const { participantIds, currentUserId } = data; 

                if (!currentUserId || !participantIds || participantIds.length !== 2) {
                    socket.emit('chat-error', { message: 'Exactly 2 participants required' });
                    return;
                }
                console.log("Socket-", participantIds, currentUserId);
                
                const { chat, isNew } = await chatController.createChat(participantIds, currentUserId);

                if (isNew) {
                    participantIds.forEach(participantId => {
                        io.to(participantId.toString()).emit('chat-created', {
                            chatId: chat._id,
                            name: chat.name,
                            participants: chat.participants,
                            createdAt: chat.createdAt
                        });
                    });
                } else {
                    socket.emit('chat-exists', {
                        chatId: chat._id,
                        name: chat.name
                    });
                }

            } catch (error) {
                console.error('Create chat socket error:', error);
                socket.emit('chat-error', { message: error.message });
            }
        });
        socket.on('get-user-chats', async (userId) => {
            try {
                const user = await User.findById(userId)
                    .populate({
                        path: 'chatList',
                        populate: {
                            path: 'participants',
                            select: 'name email'
                        }
                    });

                socket.emit('user-chats', user.chatList);
            } catch (error) {
                console.error('Get user chats error:', error);
                socket.emit('chat-error', { message: 'Failed to get chats' });
            }
        });
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
