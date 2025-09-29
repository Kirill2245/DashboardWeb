
import styles from './styles.module.css';
import CloseFrame from '@image/CloseFrame.svg'
import TypeSchedule from './TypeSchedule/TypeSchedule';
import { useState } from 'react';
import FormEvent from './Forms/FormEvent/FormEvent';
import FormReminder from './Forms/FormReminder/FormReminder';
import FormTask from './Forms/FormTask/FormTask';
const CreateSchedule = ({isCloseFrame, selectDate, userId}) => {
    const [typeSchedule, setType] = useState(0)
    const setDataType = (typeId) => {
        setType(typeId)
    }
    const renderFormSchedule = () => {
        switch(typeSchedule){
            case 0: return <FormEvent selectDate={selectDate} userId={userId}/>
            case 1: return <FormReminder selectDate={selectDate} userId={userId}/>
            case 2: return <FormTask />
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