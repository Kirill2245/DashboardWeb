
import { useEffect } from 'react';
import CalendarDay from './CalendarDay/CalendarDay';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import CalendarWeek from './CalendarWeek/CalendarWeek';
import CalendarYear from './CalendarYear/CalendarYear';
import styles from './styles.module.css';
import { fetch_schedule } from '@api/user_requests';
import { useState } from 'react';

const SectionCalendar = ({calendarId, userId}) => {
    const [scheduleList, setScheduleList] = useState([])
    useEffect(() => {
        const fetch = async() => {
            try{
                const result = await fetch_schedule(userId);
                if (result && result.success !== false){
                    setScheduleList(result.result)
                }
            }
            catch(err){
                console.error('Error get data',err)
                alert(err)
            }
        }
        fetch()
    },[userId])
    const calendarType = () => {
        switch (calendarId){
            case 0:
                return (<CalendarDay list={scheduleList}/>)

            case 1:
                return (<CalendarWeek/>)

            case 2:
                return (<CalendarMonth list={scheduleList}/>)

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