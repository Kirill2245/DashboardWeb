// import { useState } from 'react';
import BtnContain from '../BtnContain/BtnContain';
import Input from '../Input/Input';
import styles from './styles.module.css';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import SelectTime from '../SelectTime/SelectTime';
const FormTask = () => {
    return(
        <form className= {styles.form}>
            <Input/>
            <SelectTime/>
            <BtnContain/>
            <BtnSaveClose/>
        </form>
    );

};

export default FormTask