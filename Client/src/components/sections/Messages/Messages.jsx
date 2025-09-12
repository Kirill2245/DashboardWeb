import { useEffect } from 'react';
import styles from './styles.module.css';
import SocketService from '@api/socketService.js'
import { useRef } from 'react';

const Messages = ({userId}) => {
    const socketServiceRef = useRef(SocketService)
    useEffect(() => {
        const socketService = socketServiceRef.current;
        socketService.connect(userId);
    })
    return(
        <section className= {styles.section}>
            <>MMM</>
        </section>
    );
};

export default Messages