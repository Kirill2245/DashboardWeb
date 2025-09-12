import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
    }

    connect(userId) {
        try {
            this.socket = io('https://localhost:5001', {
                withCredentials: true,
                transports: ['websocket', 'polling'],
                secure: true,
                rejectUnauthorized: false 
            });

            this.socket.on('connect', () => {
                console.log('Connected to chat server:', this.socket.id);
                this.isConnected = true;
                this.socket.emit('message', userId)
            }); 

            this.socket.on('disconnect', () => {
                console.log('Disconnected from chat server');
                this.isConnected = false;
            });

            this.socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
                this.isConnected = false;
            });

            return this.socket;

        } catch (error) {
            console.error('Failed to connect to socket:', error);
            return null;
        }
    }

}
export default new SocketService();