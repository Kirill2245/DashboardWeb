
import styles from './styles.module.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import EventsContainer from './EventsContainer/EventsContainer';

const CalendarMonth = ({list}) => {
    const [date, setDate] = useState(new Date());
    const formatShortWeekday = (locale, date) => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekdays[date.getDay()];
    };
    const formatMonthYear = (locale, date) => {
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    };
        const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate < today;
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return isPastDate(date);
        }
        return false;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (isPastDate(date)) {
                return 'past-date'; 
            }
        }
        return null;
    };
const tileContent = ({ date, view }) => {
    if (view === 'month') {
        const currentDateString = date.toLocaleDateString('en-CA');
        
        const eventsForDate = list.filter(item => {
            const dateItem = new Date(item.data.date);
            const itemDateString = dateItem.toISOString().split('T')[0];
            return itemDateString === currentDateString;
        });
        
        if (eventsForDate.length > 0) {
            return (
                <EventsContainer data={eventsForDate} len={eventsForDate.length}/>
            );
        }
    }
    return null;
};

    return(
        <div className= {styles.calendar}>
            <Calendar
                onChange={setDate}
                value={date}
                view="month" 
                showNeighboringMonth={true}
                prev2Label={null}  
                next2Label={null}  
                calendarType="gregory"
                formatShortWeekday={formatShortWeekday}
                formatMonthYear={formatMonthYear}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                minDate={new Date()}
                tileContent={tileContent} 
            />
            
        </div>
    );
};

export default CalendarMonth