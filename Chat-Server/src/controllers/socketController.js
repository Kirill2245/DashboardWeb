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
                        select: 'name fullName email'
                    }
                });

            const formattedChats = user.chatList.map(chat => {
                const otherParticipant = chat.participants.find(
                    participant => participant._id.toString() !== userId.toString()
                );
                
                return {
                    _id: chat._id,
                    name: otherParticipant ? `${otherParticipant.name} ${otherParticipant.fullName}` : 'Unknown',
                    participants: chat.participants,
                    isGroup: chat.isGroup,
                    lastMessage: chat.lastMessage,
                    createdAt: chat.createdAt,
                    otherParticipant: otherParticipant
                };
            });

            socket.emit('user-chats', formattedChats);
            console.log("Chat-Socket", formattedChats);
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
