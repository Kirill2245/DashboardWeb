import  Button  from '@common/Button/Button.jsx';
import styles from './styles.module.css';
import { useState } from 'react';

const Calendar = () => {
    const [activeBtnIndex, setActiveBtnIndex] = useState(null);
    const listBtnName = ["Day", "Week", "Month", "Year"]
    const handleButtonClick = (index) => {
        setActiveBtnIndex(index);
    };
    return(
        <section className= {styles.section}>
            <header className={styles.header}>
                <h2>Calendar</h2>
                <nav>
                    {listBtnName.map((item, index)=>(
                        <Button text = {item} styles = {`calendarNav ${activeBtnIndex === index ? 'active' : ''}`} key ={index} onClick = {() => handleButtonClick(index)}/>
                    ))}
                </nav>
            </header>
        </section>
    );
};

export default Calendar