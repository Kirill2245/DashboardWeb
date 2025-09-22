import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Message from './Message/Message';
const MessageFrame = ({textMessage, userId}) => {
    const [message, setMessage] = useState([])

    useEffect(() => {
        setMessage(textMessage )
    },[textMessage])
    return (
        <div className={styles.Chats}>

            {!message || message.length === 0 
                ? <p>No messages</p>
                : message.map((item, index) => (
                    <Message item={item} key={index} userId={userId}/>
                ))
            }
        </div>
    );
};

export default MessageFrame