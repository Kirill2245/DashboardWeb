
import styles from './styles.module.css';
import test from '@image/2.jpg';
import phone from '@image/phone.svg';
import videoCall from '@image/videoCall.svg';
import group from '@image/Group143.svg';
import addimage from '@image/addimage.svg';
import Smile from '@image/Smile.svg';
import sendIcon from '@image/sendIcon.svg'
import { useState, useLayoutEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
const Chat = ({dataUser}) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const onEmojiClick = (emojiObject) => {
        setMessage(prev => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };
    useLayoutEffect(() => {
        const style = document.documentElement.style;
        style.setProperty('--epr-bg-color', '#dd1212ff');
        style.setProperty('--epr-text-color', '#1a202c');
        style.setProperty('--epr-border-color', '#e2e8f0');
        style.setProperty('--epr-search-bg-color', '#f7fafc');
        style.setProperty('--epr-search-border-color', '#4299e1');
        style.setProperty('--epr-search-placeholder-color', '#a0aec0');
        style.setProperty('--epr-category-label-bg-color', '#f7fafc');
        style.setProperty('--epr-emoji-size', '32px');
        style.setProperty('--epr-picker-border-radius', '12px');
        style.setProperty('--epr-hover-bg-color', '#edf2f7');
    }, []);
    return(
        <section className= {styles.section}>
            <header>
                <div className={styles.contain}>
                    <img src = {test}/>
                    <div>
                        <h3>{dataUser.name}</h3>
                        <span>Online</span>
                    </div>
                </div>
                <figure>
                    <img src = {phone}/>
                    <img src = {videoCall}/>
                    <img src = {group}/>
                </figure>
            </header>
            <footer>
                <div className={styles.contain}>
                    <img src = {addimage} className={styles.addimage}/>
                    <svg width="1" height="20" viewBox="0 0 1 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <line opacity="0.5" x1="0.5" y1="0.5" x2="0.499999" y2="19.5" stroke="black" stroke-linecap="round"/>
                    </svg>
                    <input 
                        placeholder='Type a message...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={styles.input}
                    />
                    <img src = {Smile} onClick={() => setShowEmojiPicker(prev => !prev)} className={styles.Smile}/>
                    {showEmojiPicker && (
                        <div className={styles.emojiPickerContainer} >
                            <EmojiPicker 
                                onEmojiClick={onEmojiClick}
                                width={350}
                                height={400}
                                searchDisabled={false}
                                skinTonesDisabled={true}
                                previewConfig={{
                                    showPreview: false
                                }}
                                size="25"
                            />
                        </div>
                    )}
                    <img src = {sendIcon} className={styles.sendIcon}/>
                </div>
            </footer>
        </section>
    );
};

export default Chat