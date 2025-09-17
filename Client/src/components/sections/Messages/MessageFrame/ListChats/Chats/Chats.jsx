import SocketService from '@api/socketService.js'
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import test from '@image/2.jpg';
const Chats = ({ userId , isVisibleChat, listChats}) => {
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
    useEffect(() => {console.log(listChats,'hduhusdds')},[listChats])
    const list = listChats.length !== 0 ? listChats : chats
    return (
        <div className= {styles.Chats}>
            {list.map(chat => (
                <div key={chat._id} className={styles.item} onClick={() => isVisibleChat({name:chat.name, chatId:chat._id})}>
                    <img src = {test}/>
                    <div>
                        <h3>{chat.name}</h3>
                        <p>{!chat.lastMessage ? "No message" : chat.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chats