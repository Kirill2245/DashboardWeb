import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.userId = null;
    }

    connect(userId) {
        this.userId = userId;
        this.socket = io('https://localhost:5001', {
            secure: true,
            rejectUnauthorized: false 
        });

        this.socket.on('connect', () => {
            this.socket.emit('user-connected', userId);
        });
    }

    createChat(friendId, myId) {
        if (this.socket) {
            this.socket.emit('create-chat', { 
                participantIds: [friendId, myId],
                currentUserId: myId
            });
            console.log('Creating chat between:', friendId, myId);
        }
    }

    getChat(myId){
        console.log("GetChat",myId)
        if(this.socket){
            this.socket.emit('get-user-chats', myId)
        }
    }
}

export default new SocketService();