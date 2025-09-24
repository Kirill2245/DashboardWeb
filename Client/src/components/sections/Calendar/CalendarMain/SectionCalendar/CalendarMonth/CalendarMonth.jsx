
import styles from './styles.module.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import EventsContainer from './EventsContainer/EventsContainer';
import { useEffect } from 'react';
const CalendarMonth = ({list}) => {
    const [date, setDate] = useState(new Date());
    // const testDate = [
    //     {name:"Free day", type:"rem", date: '2025-09-29'},
    //     {name:"Meeting", type:"event", date: '2025-09-25'},
    //     {name:"Meeting", type:"event", date: '2025-09-25'},
    //     {name:"Meeting", type:"event", date: '2025-09-25'},
    //     {name:"Free day", type:"event", date: '2025-09-29'},
    //     {name:"Fre21e day", type:"task", date: '2025-09-24'},
    //     {name:"Free day", type:"task", date: '2025-09-29'},
    //     {name:"Free day", type:"rem", date: '2025-09-29'},
    //     {name:"Free day", type:"task", date: '2025-09-29'},
    //     {name:"Fre21e day", type:"rem", date: '2025-09-27'},
    // ];
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
useEffect(() => {console.log('Schedule', list)},[list])
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