import styles from './styles.module.css';
import MessageFrame from './MessageFrame/MessageFrame';
import InputMessage from './InputMessage/InputMessage';
import { useState, useEffect} from 'react';
import HeaderChat from './HeaderChat/HeaderChat';
import SocketService from '@api/socketService.js'
const Chat = ({dataUser, userId}) => {
    const [messages, setMessages] =  useState([])
    const [messageHistory, setHistory] = useState([])

    useEffect(() => {
            SocketService.connect(userId);
            
            SocketService.socket.on('get-history', (data) => {
                console.log('Received history:', data);
                setHistory(data); 
            });
    
            SocketService.socket.on('message-error', (error) => {
                console.error('Message history error:', error);
            });
    
            SocketService. getHistory(userId, dataUser.chatId);
    
            return () => {
                if (SocketService.socket) {
                    SocketService.socket.disconnect();
                }
            };
        }, [userId, dataUser]);
    useEffect(() => {
        console.log(messageHistory)
        setMessages(messageHistory.history)
    },[messageHistory])

    const newMessage = (data) =>{
        setMessages(prev => [...prev, data])
    }
    return(
        <section className= {styles.section}>
            <HeaderChat dataUser={dataUser}/>
            <MessageFrame  textMessage={messages} userId={userId}/>
            <InputMessage userId={userId} dataUser={dataUser} sendMessage={newMessage} />
        </section>
    );
};

export default Chat