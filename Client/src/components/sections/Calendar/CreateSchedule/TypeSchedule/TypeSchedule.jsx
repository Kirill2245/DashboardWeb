import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const TypeSchedule = ({setType}) => {
    const typeList = ["Event", "Reminder", "Task"]
    const [idNav, setId] = useState(0)
    useEffect(() => {
        setType(idNav)
    },[setType, idNav])
    return(
        <nav className= {styles.nav}>
            {typeList.map((item,index) => (
                <div className={`${styles.contain} ${idNav == index ? styles.containActive : ""}`} onClick={() => setId(index)}>
                    <p key={index}>{item}</p>
                    <div>{item}</div>
                </div>
            ))}
        </nav>
    );

};

export default TypeSchedule