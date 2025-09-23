
import CalendarDay from './CalendarDay/CalendarDay';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import CalendarWeek from './CalendarWeek/CalendarWeek';
import CalendarYear from './CalendarYear/CalendarYear';
import styles from './styles.module.css';


const SectionCalendar = ({calendarId}) => {
    const calendarType = () => {
        switch (calendarId){
            case 0:
                return (<CalendarDay/>)

            case 1:
                return (<CalendarWeek/>)

            case 2:
                return (<CalendarMonth/>)

            case 3:
                return (<CalendarYear/>)
        }
    }
    return(
        <section className= {styles.section}>
            {calendarType()}
        </section>
    );
};

export default SectionCalendar