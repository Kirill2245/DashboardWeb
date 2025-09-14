import styles from './styles.module.css';
import Addbaton from '@image/Addbaton.svg';
import iconSearch from '@image/iconSearch.svg'
import ListChats from './ListChats/ListChats';
import { useState } from 'react';
import AddChats from './addChats/AddChats';
const Message = () => {
    const [showAddChats, isShowAddChats] = useState(false)
    return(
        <section className= {styles.sectionMessage}>
            <header className={styles.header}>
                <article>
                    <h2>Message</h2>
                    <img src = {Addbaton} onClick={() => isShowAddChats(true)}/>
                </article>
                <div>
                    <img src = {iconSearch}/>
                    <input type='text' placeholder='Search'/>
                </div>
            </header>
            {showAddChats && <AddChats isClose = {() => isShowAddChats(false)}/>}
            <ListChats/>
        </section>
    );
};

export default Message