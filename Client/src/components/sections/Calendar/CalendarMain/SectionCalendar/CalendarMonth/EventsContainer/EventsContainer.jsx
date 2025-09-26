
import { useState } from 'react';
import styles from './styles.module.css';
import  Button  from '@common/Button/Button.jsx';
import { useEffect } from 'react';
const EventsContainer = ({data, len}) => {
    const [moreActive, isMoreActive] = useState(false)
    const typeClassMap = {
        'Reminder': styles.reminder,
        'Event': styles.event,
        'Task': styles.task
    };
    useEffect(() => {console.log('elem',data)},[data])
    return(
        <div className={styles.eventsContainer}>
            {moreActive ?
                data.map((item, index) => {
                    const typeClass = typeClassMap[item.itemType] || styles.default;
                    return (
                        <div key={index} className={`${styles.eventMarker} ${typeClass}`}>
                            <p>{item.data.title}</p>
                        </div>
                    );
                }) 
            :
                data.slice(0,2).map((item, index) => {
                    const typeClass = typeClassMap[item.itemType] || styles.default;
                    return (
                        <div key={index} className={`${styles.eventMarker} ${typeClass}`}>
                            <p>{item.data.title}</p>
                        </div>
                    );
                }) 
            }

            {len > 2 && <Button text = {moreActive ? "Roll up" : "More"} styles = "more" onClick = {() => isMoreActive(p => !p)}/>}
        </div>
    );
};

export default EventsContainer