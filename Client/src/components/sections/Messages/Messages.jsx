
import styles from './styles.module.css';
import Message from './Message/Message';
import Chat from './Chat/Chat';
import { useState } from 'react';

const Messages = ({userId}) => {
    const [Visible, isVisible] = useState(false)
    const [dataUser, setDataUser] = useState(null)
    const handleVisibleChat = (data) => {
        isVisible(true)
        setDataUser(data)
    }
    const data = {name:"Tset sddsds"}
    return(
        <section className= {styles.section}>
            <Message userId={userId} isVisibleChat={handleVisibleChat}/>
            {Visible && <Chat dataUser={dataUser}/>}
            <Chat dataUser={data}/>
        </section>
    );
};

export default Messages