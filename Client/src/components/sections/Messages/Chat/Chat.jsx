
import styles from './styles.module.css';
import test from '@image/2.jpg';
import phone from '@image/phone.svg'
import videoCall from '@image/videoCall.svg'
import group from '@image/Group143.svg'
const Chat = ({dataUser}) => {
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
            <footer></footer>
        </section>
    );
};

export default Chat