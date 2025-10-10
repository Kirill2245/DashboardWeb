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
        
        const handleUserHistory = (data) => {
            setHistory(data);
        };

        const handleHistoryError = (error) => {
            console.error('Message history error:', error);
        };

        SocketService.socket.on('get-history', handleUserHistory);
        SocketService.socket.on('message-error', handleHistoryError);

        SocketService. getHistory(userId, dataUser.chatId);

        return () => {
            if (SocketService.socket) {
                SocketService.socket.off('get-history', handleUserHistory);
                SocketService.socket.off('message-error', handleHistoryError);
            }
        };
    }, [userId, dataUser]);
    useEffect(() => {
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