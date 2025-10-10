
import styles from './styles.module.css';
import CardTask from '../CardTask/CardTask';

const AsideTime = ({data}) => {
    const generateTimeList = () => {
    const times = [];
        for (let hour = 0; hour < 24; hour++) {
            const timeString = hour.toString().padStart(2, '0') + '.00';
            const period = hour < 12 ? 'AM' : 'PM';
            times.push(`${timeString} ${period}`);
        }
        return times;
    };

    const timeList = generateTimeList();
    return(
        <div className= {styles.section}>
            <div className={styles.aside}>
            {timeList.map((item, index) => {
            const cleanTime = item.replace(' AM', '').replace(' PM', '').replace('.', ':');
            const cleanHours = cleanTime.split(':')[0]; 

            const tasksForThisTime = data.filter(elem => {
                const elemHours = elem.data.startTime.split(':')[0]; 
                return cleanHours === elemHours;
            });
                return (
                    <div key={index} className={styles.boxItem}>
                        <div className={styles.item}>
                            <span>{item}</span>
                        </div>
                        <div className={styles.containCardTask}>
                            {tasksForThisTime.map((elem, id) => (
                                <CardTask 
                                    title={elem.data.title} 
                                    tag={elem.data.tags} 
                                    countMember={elem.data.memberList.length} 
                                    key={`${index}-${id}`}
                                />
                            ))}                     
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
};

export default AsideTime