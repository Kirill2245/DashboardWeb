
import styles from './styles.module.css';
import Message from './Message/Message';

const Messages = ({userId}) => {
    return(
        <section className= {styles.section}>
            <Message userId={userId}/>
        </section>
    );
};

export default Messages