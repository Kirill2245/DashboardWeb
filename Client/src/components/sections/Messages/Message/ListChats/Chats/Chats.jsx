import SocketService from '@api/socketService.js'
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
const Chats = ({ userId }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        SocketService.connect(userId);
        
        SocketService.socket.on('user-chats', (data) => {
            console.log('Received chats:', data);
            setChats(data); 
        });

        SocketService.socket.on('chat-error', (error) => {
            console.error('Chat error:', error);
        });

        SocketService.getChat(userId);

        return () => {
            if (SocketService.socket) {
                SocketService.socket.disconnect();
            }
        };
    }, [userId]);

    return (
        <div className= {styles.Chats}>
            <h2>Your Chats</h2>
            {chats.length === 0 ? (
                <p>No chats yet</p>
            ) : (
                <div>
                    {chats.map(chat => (
                        <div key={chat._id} className="chat-item">
                            <h3>{chat.name}</h3>
                            <p>Participants: {chat.participants.map(p => p.name).join(', ')}</p>
                            <p>Created: {new Date(chat.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Chats