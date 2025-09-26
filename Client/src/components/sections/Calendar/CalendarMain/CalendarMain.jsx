
import SectionCalendar from './SectionCalendar/SectionCalendar';
import SectionCreate from './SectionCreate/SectionCreate';
import styles from './styles.module.css';


const CalendarMain = ({calendarId, isActiveCreateBtn, userId, SetDate}) => {


    return(
        <div className= {styles.section}>
            <SectionCreate isActiveCreateBtn = {isActiveCreateBtn} SetDate={SetDate}/>
            <SectionCalendar calendarId={calendarId} userId={userId}/>
        </div>
    );
};

export default CalendarMain