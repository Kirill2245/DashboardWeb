import { useState } from 'react';
import styles from './styles.module.css';
import Chats from './Chats/Chats';
const ListChats = ({userId, isVisibleChat}) => {
    const tabs = ['All', 'Personal', 'Teams'];
    const [ActiveTab, isActiveTab] = useState(0)
    return(
        <section className= {styles.section}>
            <header>
                <nav>
                    {tabs.map((item, index) => (
                        <div className={`${styles.contain} ${ActiveTab === index ? styles.active : ''}`} key={index}>
                            <button type="button" role="tab" onClick={() => isActiveTab(index)}>{item}</button>
                            <div style={styles.className}></div>
                        </div>
                    ))}
                </nav>
            </header>
            <Chats userId= {userId} isVisibleChat = {isVisibleChat}/>
        </section>
    );
};

export default ListChats