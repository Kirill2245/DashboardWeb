// import { useState } from 'react';
import styles from './styles.module.css';

const Input = ({Change, name, value}) => {
    return(

        <input type='text' placeholder='Add title' className={styles.input} onChange={Change} value={value} name={`${name}`}/>

    );

};

export default Input