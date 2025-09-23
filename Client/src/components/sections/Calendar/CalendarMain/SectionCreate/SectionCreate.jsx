
import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo'
import Plus from '@image/Plus.svg'
import People from './People/People';
import  Button  from '@common/Button/Button.jsx';
import Calendar from 'react-calendar';
import { useState } from 'react';
const SectionCreate = () => {

    const [value, onChange] = useState(new Date())
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
    return(
        <section className= {styles.section}>
            <ButtonLogo text = "Create Schedule" image = {Plus} styles = "createSchedule-calendar"/>
            <div className={styles.calendar}>
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    calendarType="gregory"
                    formatShortWeekday={formatShortWeekday}
                    formatMonthYear={formatMonthYear}
                    prev2Label={null}  
                    next2Label={null}  
                    tileDisabled={tileDisabled}
                    tileClassName={tileClassName}
                    minDate={new Date()}
                />
            </div>
            <People/>
            <Button text = "My Schedule" styles = "my-schedule"/>
        </section>
    );
};

export default SectionCreate