import Addbaton from '@image/Addbaton.svg';
import styles from './styles.module.css';
import SocketService from '@api/socketService.js'
import { useEffect } from 'react';
const TableUser = ({dataUser, userId}) => {
    useEffect(() => {
        SocketService.connect(userId);
        

        SocketService.socket.on('chat-created', (data) => {
            console.log('Chat created:', data);
        });

        SocketService.socket.on('chat-error', (error) => {
            console.error('Chat error:', error);
        });

        return () => {
            if (SocketService.socket) {
                SocketService.socket.disconnect();
            }
        };
    }, [userId]);
    const handleCreateChat = (friendId) => {
        SocketService.createChat(friendId, userId);
        console.log('Запрос на создание чата отправлен!');
    };
    return(
        <table className= {styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {dataUser.map((item, index) => (
                    <tr key = {index}>
                        <td>{item.name}</td>
                        <td><img src = {Addbaton} onClick={() => handleCreateChat(item._id || item.id)}/></td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
};

export default TableUser