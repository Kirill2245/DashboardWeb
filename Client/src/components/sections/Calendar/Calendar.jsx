import  Button  from '@common/Button/Button.jsx';
import styles from './styles.module.css';
import { useState } from 'react';
import CalendarMain from './CalendarMain/CalendarMain';
import CreateSchedule from './CreateSchedule/CreateSchedule';

const Calendar = ({userId}) => {
    const [activeBtnIndex, setActiveBtnIndex] = useState(null);
    const [activeCreateBtn, isActiveCreateBtn] = useState(false);
    const listBtnName = ["Day", "Week", "Month", "Year"];
    const [valueDate, setValueDate] = useState(null)
    const handleButtonClick = (index) => {
        setActiveBtnIndex(index);
    };
    const handleSetDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const newDate = new Date(Date.UTC(year, month, day))
        setValueDate(newDate.toISOString());
    }

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
            <CalendarMain calendarId={activeBtnIndex} isActiveCreateBtn={() => isActiveCreateBtn(true)} userId={userId} SetDate={handleSetDate}/>
            {activeCreateBtn && <div className={styles.bgActive}><CreateSchedule isCloseFrame={() => isActiveCreateBtn(false)} selectDate={valueDate}/></div>}
            
        </section>
    );
};

export default Calendar