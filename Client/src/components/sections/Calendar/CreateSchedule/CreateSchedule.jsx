
import styles from './styles.module.css';
import CloseFrame from '@image/CloseFrame.svg'
const CreateSchedule = ({isCloseFrame}) => {

    return(
        <section className= {styles.section}>
            <header className= {styles.header}>
                <h3>Create an Event</h3>
                <img src={CloseFrame} onClick={isCloseFrame}/>
            </header>
        </section>
    );

};

export default CreateSchedule