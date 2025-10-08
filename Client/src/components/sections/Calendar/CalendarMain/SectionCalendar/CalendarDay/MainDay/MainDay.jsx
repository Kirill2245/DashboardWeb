
import { useEffect } from 'react';
import ElemCalendar from './ElemCalendar/ElemCalendar';
import styles from './styles.module.css';
const MainDay = ({list}) => {
    const generateTimeList = () => {
        const times = [];
            for (let hour = 0; hour < 24; hour++) {
                const timeString = hour.toString().padStart(2, '0') + '.00';
                const period = hour < 12 ? 'AM' : 'PM';
                times.push(`${timeString} ${period}`);
            }
            return times;
    };
    const generateUniquePositions = (count, step = 14.07, maxValue = 81) => {
        const stepsCount = Math.floor(maxValue / step);
        const allPositions = Array.from({length: stepsCount + 1}, (_, i) => i * step);
        
        const shuffled = [...allPositions].sort(() => Math.random() - 0.5);
        
        return Array.from({length: count}, (_, i) => shuffled[i % shuffled.length]);
    };
    useEffect(() => {console.log(list,"ASDBHhsdhsdvghjs")},[list])
    const timeList = generateTimeList();
    return(
        <div className= {styles.contain}>
            {timeList.map((item,index)=>{
                const cleanTime = item.replace(' AM', '').replace(' PM', '').replace('.', ':');
                const cleanHours = cleanTime.split(':')[0]; 

                const tasksForThisTime = list.filter(elem => {
                    const elemHours = elem.data.startTime.split(':')[0]; 
                    return cleanHours === elemHours;
                });
                const positions = generateUniquePositions(tasksForThisTime.length);
                return(
                    <div key = {index} className={styles.timeItemBox}>
                        <span>{item}</span>
                        <div className={styles.itemBox}>
                            
                            {tasksForThisTime.map((item, index) => (<ElemCalendar title={item.data.title} type={item.itemType} left={positions[index]}/>))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default MainDay