// import { useState } from 'react';
import styles from './styles.module.css';

const Input = ({Change, name, value, placeholder = 'Add title'}) => {
    return(

        <input type='text' placeholder={placeholder} className={styles.input} onChange={Change} value={value} name={`${name}`}/>

    );

};

export default Input