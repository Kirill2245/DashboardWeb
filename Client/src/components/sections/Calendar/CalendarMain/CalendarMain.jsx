
import SectionCalendar from './SectionCalendar/SectionCalendar';
import SectionCreate from './SectionCreate/SectionCreate';
import styles from './styles.module.css';


const CalendarMain = ({calendarId, isActiveCreateBtn, userId}) => {


    return(
        <div className= {styles.section}>
            <SectionCreate isActiveCreateBtn = {isActiveCreateBtn}/>
            <SectionCalendar calendarId={calendarId} userId={userId}/>
        </div>
    );
};

export default CalendarMain