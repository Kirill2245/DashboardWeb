import styles from './styles.module.css';
import MessageFrame from './MessageFrame/MessageFrame';
import InputMessage from './InputMessage/InputMessage';
import { useState } from 'react';
import HeaderChat from './HeaderChat/HeaderChat';
const Chat = ({dataUser, userId}) => {
    const [messages, setMessages] =  useState([])
    const newMessage = (data) =>{
        setMessages(data)
    }
    return(
        <section className= {styles.section}>
            <HeaderChat dataUser={dataUser}/>
            <MessageFrame  textMessage={messages} userId={userId}/>
            <InputMessage userId={userId} dataUser={dataUser} sendMessage={newMessage}/>
        </section>
    );
};

export default Chat