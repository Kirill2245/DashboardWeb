import { useState } from 'react';
import MainDay from './MainDay/MainDay';
import styles from './styles.module.css';
import ArrowLeft from '@image/ArrowLeft.svg';
const CalendarDay = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const nextDay = () => {
        const next = new Date(currentDate);
        next.setDate(currentDate.getDate() + 1);
        setCurrentDate(next);
    };
    
    const prevDay = () => {
        const prev = new Date(currentDate);
        prev.setDate(currentDate.getDate() - 1);
        setCurrentDate(prev);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return(
        <div className= {styles.calendar}>
            <header className={styles.header}>
                <h3>{formatDate(currentDate)}</h3>
                <figure>
                    <img src = {ArrowLeft} onClick={prevDay}/>
                    <img src = {ArrowLeft} onClick={nextDay}/>
                </figure>
            </header>
            <MainDay/>
        </div>
    );
};

export default CalendarDay