import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './styles.module.css';
import ButtonLogo from '../ButtonLogo/ButtonLogo';
import arrow from '@image/Arrow.svg';

const CalendarButton = ({ text, setDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleDateChange = (date) => {
        if (date) {

            const cleanDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );
            
            setSelectedDate(cleanDate);
            setShowCalendar(false);
            setDate(cleanDate); 
        } else {
            setSelectedDate(null);
            setDate(null);
        }
    };

    return (
        <div className={styles.container}> 
            <button 
                onClick={() => setShowCalendar(!showCalendar)} 
                className={styles.button}
            >
                <span>
                    {selectedDate ? selectedDate.toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }) : text}
                </span>
                <img src={arrow} alt="Calendar toggle" />
            </button>
            
            {showCalendar && (
                <div className={styles.calendarPositioner}>
                    <div className={styles.calendarWrapper}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline
                            onClickOutside={() => setShowCalendar(false)}
                            maxDate={today}
                            dateFormat="dd.MM.yyyy"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarButton;