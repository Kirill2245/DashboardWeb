// import { useState } from 'react';
import styles from './styles.module.css';
import Input from '../Input/Input';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import SelectTime from '../SelectTime/SelectTime';
const FormReminder = () => {
    return(
        <form className= {styles.form}>
            <Input/>
            <SelectTime/>
            <BtnSaveClose/>
        </form>
    );

};

export default FormReminder