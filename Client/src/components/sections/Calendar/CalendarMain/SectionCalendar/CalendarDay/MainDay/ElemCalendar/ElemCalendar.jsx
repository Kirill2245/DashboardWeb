
import styles from './styles.module.css';
const ElemCalendar= ({title, type}) => {
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 81) ;
    }; 
    const getColorType = () => {
        switch(type){
            case 'Event':
                return '#FF8F6B'
            case 'Task':
                return '#EF37FF' 
            case 'Reminder':
                return '#26C0E2'
        }

            
    }
    return(
        <div className= {styles.elem} style={{left: `${getRandomNumber()}%`,backgroundColor:getColorType()}}>
            <p>{title}</p>
        </div>
    );
};

export default ElemCalendar