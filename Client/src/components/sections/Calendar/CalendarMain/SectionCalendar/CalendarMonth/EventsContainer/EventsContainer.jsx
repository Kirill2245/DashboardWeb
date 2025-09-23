
import styles from './styles.module.css';
import  Button  from '@common/Button/Button.jsx';
const EventsContainer = ({data, len}) => {
        const typeClassMap = {
            'rem': styles.reminder,
            'event': styles.event,
            'task': styles.task
        };
    return(
        <div className={styles.eventsContainer}>
            {data.map((item, index) => {
                const typeClass = typeClassMap[item.type] || styles.default;
                return (
                    <div key={index} className={`${styles.eventMarker} ${typeClass}`}>
                        <p>{item.name}</p>
                    </div>
                );
            })}
            {len > 2 && <Button text = "More" styles = "more"/>}
        </div>
    );
};

export default EventsContainer