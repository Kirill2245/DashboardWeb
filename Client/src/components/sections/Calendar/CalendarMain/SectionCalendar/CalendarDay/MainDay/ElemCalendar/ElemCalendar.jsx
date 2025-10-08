
import styles from './styles.module.css';
const ElemCalendar= ({title, type, left}) => {

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
            <div className= {styles.elem} style={{left: `${left}%`,backgroundColor:getColorType()}}>
                <p>{title}</p>
            </div>
    );
};

export default ElemCalendar