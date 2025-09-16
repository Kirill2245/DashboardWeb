
import styles from './styles.module.css';
import Message from './Message/MessageFrame';
import Chat from './Chat/Chat';
import { useState } from 'react';

const MessagesSection = ({userId}) => {
    const [Visible, isVisible] = useState(false)
    const [dataUser, setDataUser] = useState(null)
    const handleVisibleChat = (data) => {
        isVisible(true)
        setDataUser(data)
    }
    // const data = {name:"Tset sddsds"}
    return(
        <section className= {styles.section}>
            <Message userId={userId} isVisibleChat={handleVisibleChat}/>
            {Visible && <Chat dataUser={dataUser} userId={userId}/>}
            {/* <Chat dataUser={data} userId={userId}/> */}
        </section>
    );
};

export default MessagesSection