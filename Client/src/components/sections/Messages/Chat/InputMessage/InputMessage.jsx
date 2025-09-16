import SocketService from '@api/socketService.js'
import styles from './styles.module.css';
import addimage from '@image/addimage.svg';
import Smile from '@image/Smile.svg';
import sendIcon from '@image/sendIcon.svg'
import { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
const InputMessage = ({dataUser, userId, sendMessage}) => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const onEmojiClick = (emojiObject) => {
        setInputText(prev => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };
    useEffect(() => {
        sendMessage(messages)
    },[messages,sendMessage])
    useEffect(() => {
        SocketService.connect(userId);
        
        const handleNewMessage = (data) => {
            console.log('New message received:', data);
            setMessages(prev => [...prev, data.message]);
        };

        const handleError = (error) => {
            console.error('Message error:', error);
        };

        if (SocketService.socket) {
            SocketService.socket.on('new-message', handleNewMessage);
            SocketService.socket.on('message-error', handleError);
        }
        return () => {
            if (SocketService.socket) {
                SocketService.socket.off('new-message', handleNewMessage);
                SocketService.socket.off('message-error', handleError);
            }
        };
    }, [userId]);
    const handleSendMessage = () => {
        if (inputText.trim() && dataUser.chatId) {
            console.log("Chat id--" , dataUser.chatId)
            SocketService.sendMessage(dataUser.chatId, inputText, userId);
            setInputText('');
        }
    };
    return(
        <div className={styles.contain}>
            <img src = {addimage} className={styles.addimage}/>
            <svg width="1" height="20" viewBox="0 0 1 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <line opacity="0.5" x1="0.5" y1="0.5" x2="0.499999" y2="19.5" stroke="black" stroke-linecap="round"/>
            </svg>
            <input 
                placeholder='Type a message...'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={styles.input}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
            <img src = {sendIcon} className={styles.sendIcon} onClick={handleSendMessage}/>
        </div>
    );
};

export default InputMessage