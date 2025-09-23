
import SectionCalendar from './SectionCalendar/SectionCalendar';
import SectionCreate from './SectionCreate/SectionCreate';
import styles from './styles.module.css';


const CalendarMain = ({calendarId, isActiveCreateBtn}) => {


    return(
        <div className= {styles.section}>
            <SectionCreate isActiveCreateBtn = {isActiveCreateBtn}/>
            <SectionCalendar calendarId={calendarId}/>
        </div>
    );
};

export default CalendarMain