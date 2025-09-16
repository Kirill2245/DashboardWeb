
import styles from './styles.module.css';
import test from '@image/2.jpg';
import {formatTimeShort} from '@lib/formatDate.js'
const Message = ({item, userId}) => {
    return (
        <div className= {`${styles.messageContain} ${item.senderId._id == userId ? styles.MeMessage : styles.SenderMessage}`}>
                <div className={styles.contain}>
                    <div>
                        <p className={styles.message}>{item.text}</p>
                        <aside>
                            {item.senderId._id == userId ? "" : <p>{`${item.senderId.name} ${item.senderId.fullName}`}</p>}
                            <p>{formatTimeShort(item.timestamp)}</p>
                        </aside>
                    </div>
                </div>   
            <img src = {test}/>
        </div>
    );
};
export default Message