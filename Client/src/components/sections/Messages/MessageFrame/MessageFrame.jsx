import styles from './styles.module.css';
import Addbaton from '@image/Addbaton.svg';
import iconSearch from '@image/iconSearch.svg'
import ListChats from './ListChats/ListChats';
import {  useState } from 'react';
import AddChats from './addChats/AddChats';
import { fetch_searchChats } from '@api/chat_request';
const MessageFrame = ({userId, isVisibleChat}) => {
    const [showAddChats, isShowAddChats] = useState(false)
    const [searchChats, setChats] = useState([])
    const [inputSearch, setInput] = useState('')
    const searchChat = async() => {
        if(!inputSearch.trim()){
            alert('Please enter search query')
        }
        try{
            const response = await fetch_searchChats({search:inputSearch}, userId)
            if (response.success){
                setChats(response.results)
            }
            else{
                console.error('Error search chat', response.message)
                alert(`Error search - ${response.message}`)
            }
        }
        catch(error){
            console.error('Error search chat',error)
            alert(`Error search chat- ${error}`)
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchChat();
        }
    };
    return(
        <section className= {styles.sectionMessage}>
            <header className={styles.header}>
                <article>
                    <h2>Message</h2>
                    <img src = {Addbaton} onClick={() => isShowAddChats(true)}/>
                </article>
                <div>
                    <img src = {iconSearch} onClick={searchChat}/>
                    <input type='text' placeholder='Search' value={inputSearch} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} />
                </div>
            </header>
            {showAddChats && <AddChats isClose = {() => isShowAddChats(false)} userId={userId}/>}
            <ListChats userId={userId} isVisibleChat={isVisibleChat} listChats = {searchChats}/>
        </section>
    );
};

export default MessageFrame