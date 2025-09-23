
import styles from './styles.module.css';
import CloseFrame from '@image/CloseFrame.svg'
import TypeSchedule from './TypeSchedule/TypeSchedule';
import { useState } from 'react';
import FormEvent from './FormEvent/FormEvent';
import FormReminder from './FormReminder/FormReminder';
import FormTask from './FormTask/FormTask';
const CreateSchedule = ({isCloseFrame}) => {
    const [typeSchedule, setType] = useState(0)
    const setDataType = (typeId) => {
        setType(typeId)
    }
    const renderFormSchedule = () => {
        switch(typeSchedule){
            case 0: return <FormEvent/>
            case 1: return <FormReminder/>
            case 2: return <FormTask/>
        }
    }
    return(
        <section className= {styles.section}>
            <header className= {styles.header}>
                <h3>Create an Event</h3>
                <img src={CloseFrame} onClick={isCloseFrame}/>
            </header>
            <TypeSchedule setType={setDataType}/>
            {renderFormSchedule()}
        </section>
    );

};

export default CreateSchedule