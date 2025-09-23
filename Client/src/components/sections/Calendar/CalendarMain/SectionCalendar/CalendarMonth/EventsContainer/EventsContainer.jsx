
import { useState } from 'react';
import styles from './styles.module.css';
import  Button  from '@common/Button/Button.jsx';
const EventsContainer = ({data, len}) => {
    const [moreActive, isMoreActive] = useState(false)
    const typeClassMap = {
        'rem': styles.reminder,
        'event': styles.event,
        'task': styles.task
    };
    return(
        <div className={styles.eventsContainer}>
            {moreActive ?
                data.map((item, index) => {
                    const typeClass = typeClassMap[item.type] || styles.default;
                    return (
                        <div key={index} className={`${styles.eventMarker} ${typeClass}`}>
                            <p>{item.name}</p>
                        </div>
                    );
                }) 
            :
                data.slice(0,2).map((item, index) => {
                    const typeClass = typeClassMap[item.type] || styles.default;
                    return (
                        <div key={index} className={`${styles.eventMarker} ${typeClass}`}>
                            <p>{item.name}</p>
                        </div>
                    );
                }) 
            }

            {len > 2 && <Button text = {moreActive ? "Roll up" : "More"} styles = "more" onClick = {() => isMoreActive(p => !p)}/>}
        </div>
    );
};

export default EventsContainer