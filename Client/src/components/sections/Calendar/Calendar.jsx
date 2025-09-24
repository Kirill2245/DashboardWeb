import  Button  from '@common/Button/Button.jsx';
import styles from './styles.module.css';
import { useState } from 'react';
import CalendarMain from './CalendarMain/CalendarMain';
import CreateSchedule from './CreateSchedule/CreateSchedule';

const Calendar = ({userId}) => {
    const [activeBtnIndex, setActiveBtnIndex] = useState(null);
    const [activeCreateBtn, isActiveCreateBtn] = useState(false)
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
            <CalendarMain calendarId={activeBtnIndex} isActiveCreateBtn={() => isActiveCreateBtn(true)} userId={userId}/>
            {activeCreateBtn && <div className={styles.bgActive}><CreateSchedule isCloseFrame={() => isActiveCreateBtn(false)}/></div>}
            
        </section>
    );
};

export default Calendar