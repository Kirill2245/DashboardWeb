const Chat = require('../models/Chat');
const User = require('../models/Users');
const mongoose = require('mongoose');
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