
import SectionCalendar from './SectionCalendar/SectionCalendar';
import SectionCreate from './SectionCreate/SectionCreate';
import styles from './styles.module.css';


const CalendarMain = () => {


    return(
        <div className= {styles.section}>
            <SectionCreate/>
            <SectionCalendar/>
        </div>
    );
};

export default CalendarMain