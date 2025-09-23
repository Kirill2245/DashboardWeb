// import { useState } from 'react';
import BtnContain from '../BtnContain/BtnContain';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import Frame from './Frame/Frame';
import Input from '../Input/Input';
import SelectTime from '../SelectTime/SelectTime';
import styles from './styles.module.css';

const FormEvent = () => {
    return(
        <form className= {styles.form}>
            <Input/>
            <SelectTime/>
            <BtnContain/>
            <Frame/>
            <BtnSaveClose/>

        </form>
    );

};

export default FormEvent