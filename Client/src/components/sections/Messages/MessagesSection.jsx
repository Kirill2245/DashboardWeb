
import styles from './styles.module.css';
import Message from './MessageFrame/MessageFrame';
import Chat from './Chat/Chat';
import { useState } from 'react';

const MessagesSection = ({userId}) => {
    const [Visible, isVisible] = useState(false)
    const [dataUser, setDataUser] = useState(null)
    const handleVisibleChat = (data) => {
        isVisible(true)
        setDataUser(data)
    }

    return(
        <section className= {styles.section}>
            <Message userId={userId} isVisibleChat={handleVisibleChat} />
            {Visible && <Chat dataUser={dataUser} userId={userId}/>}
        </section>
    );
};

export default MessagesSection