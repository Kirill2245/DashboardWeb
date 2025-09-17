const Chat = require('../models/Chat');
const User = require('../models/Users');
const mongoose = require('mongoose');
const Message = require('../models/Message')
exports.createChat = async (participantIds, currentUserId) => {
    try {
        console.log('Creating chat for participants:', participantIds);
        

        const objectIds = participantIds.map(id => new mongoose.Types.ObjectId(id));
        

        const users = await User.find({ _id: { $in: objectIds } });
        if (users.length !== participantIds.length) {
            throw new Error('One or more users not found');
        }

        const sortedParticipants = objectIds.sort();
        

        const existingChat = await Chat.findOne({
            participants: { 
                $all: sortedParticipants,
                $size: 2 
            }
        });

        if (existingChat) {
            console.log('Chat already exists:', existingChat._id);
            return { chat: existingChat, isNew: false };
        }


        const otherUser = users.find(user => !user._id.equals(new mongoose.Types.ObjectId(currentUserId)));
        const chatName = otherUser ? otherUser.name : 'Chat';

        const chat = new Chat({
            name: chatName,
            participants: objectIds,
            isGroup: false
        });

        await chat.save();
        console.log('New chat created:', chat._id);


        const updateResults = await User.updateMany(
            { _id: { $in: objectIds } }, 
            { $addToSet: { chatList: chat._id } }
        );

        console.log('Update results:', updateResults);

        if (updateResults.modifiedCount > 0) {
            console.log(`Successfully updated ${updateResults.modifiedCount} users`);
        } else {
            console.log('No users were updated');
        }


        const updatedUsers = await User.find({ _id: { $in: objectIds } });
        updatedUsers.forEach(user => {
            console.log(`User ${user._id} chatList after update:`, user.chatList);
        });

        const populatedChat = await Chat.findById(chat._id)
            .populate('participants', 'name email');

        return { chat: populatedChat, isNew: true };

    } catch (error) {
        console.error('Create chat error:', error);
        throw error;
    }
};
exports.sendMessage = async(chatId, senderId, text) => {
    try{
        const chat = await Chat.findById(chatId)
        if (!chat){
            console.error('Chat not found')
            return;
        }
        const isParticipant = chat.participants.some(
            participant => participant.toString() === senderId.toString()
        );
        if (!isParticipant) {
            console.error('User is not a participant of this chat');
            return;
        }
        const message = new Message({
            chatId,
            senderId,
            text
        });

        await message.save();

        chat.lastMessage = message.text;
        chat.messages.push(message._id)
        await chat.save();
        const populatedMessage = await Message.findById(message._id)
            .populate('senderId', 'name fullName email');

        return populatedMessage;
    }
    catch(error){
        console.error('Error send message--', error)
        throw error
    }
}
exports.searchChat = async(req,res) =>{
    try{
        const {search} = req.body
        const {userId} = req.params
        if (!search || !userId){
            return res.status(400).json({
                success:false,
                message:'User ID or search is missing'
            })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success:false,
                message:'Invalid user ID format'
            })
        }
                const chats = await Chat.find({
            participants: userId
        }).populate({
            path: 'participants',
            select: 'name fullName email',
            match: { 
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { fullName: { $regex: search, $options: 'i' } }
                ],
                _id: { $ne: userId } 
            }
        });

        const filteredChats = chats.filter(chat => {
            const hasMatchingParticipants = chat.participants.some(participant => 
                participant && 
                (
                    participant.name?.includes(search) || 
                    participant.fullName?.includes(search) ||
                    participant.name?.toLowerCase().includes(search.toLowerCase()) ||
                    participant.fullName?.toLowerCase().includes(search.toLowerCase())
                )
            );
            return hasMatchingParticipants;
        });

        if (filteredChats.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No chats found matching your search',
            });
        }

        const results = filteredChats.map(chat => {
            const matchingParticipants = chat.participants.filter(participant =>
                participant && 
                (participant.name?.toLowerCase().includes(search.toLowerCase()) ||
                participant.fullName?.toLowerCase().includes(search.toLowerCase()))
            );
            const otherParticipant = chat.participants.find(
                        participant => participant._id.toString() !== userId.toString()
                    );
            return {
                chatId: chat._id,
                otherParticipant: otherParticipant ? `${otherParticipant.name} ${otherParticipant.fullName}` : 'Unknown',
                participants: matchingParticipants.map(user => ({
                    userId: user._id,
                    name: user.name,
                    fullName: user.fullName,
                    email: user.email
                })),
                lastMessage: chat.lastMessage,
            };
        });

        res.status(200).json({
            success: true,
            message: 'Chats found successfully',
            results: results,
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Interval error',
            error:error
        })
    }
}