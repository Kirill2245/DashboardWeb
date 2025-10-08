import { useState } from 'react';
import styles from './styles.module.css';
import Calendar from 'react-calendar';
const CalendarYear = () => {
    const [value, onChange] = useState(new Date());
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const fixedDate = (month) => {
        const currentYear = new Date().getFullYear();
        return new Date(currentYear, month, 1)
    } 
    const formatShortWeekday = (locale, date) => {
        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return weekdays[date.getDay()];
    };
    const formatMonthYear = (locale, date) => {
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    };
    return(
        <div className= {styles.calendar}>
            {months.map((item,index) => (
                <Calendar 
                    onChange={onChange}
                    value={value}
                    key={index}
                    activeStartDate={fixedDate(item)}
                    formatShortWeekday={formatShortWeekday}
                    formatMonthYear={formatMonthYear}
                    prev2Label={null}  
                    next2Label={null}  
                />
            ))}
        </div>  
    );
};

export default CalendarYear