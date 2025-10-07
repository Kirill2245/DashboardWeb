
import ElemCalendar from './ElemCalendar/ElemCalendar';
import styles from './styles.module.css';
import ArrowLeft from '@image/ArrowLeft.svg';
const MainDay = () => {
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
        <div className= {styles.contain}>
            {timeList.map((item,index)=>(
                <div key = {index} className={styles.timeItemBox}>
                    <span>{item}</span>
                    <div className={styles.itemBox}>
                        {index == 1 && <ElemCalendar title={"dsds"} type={'Reminder'}/>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainDay