// import { useState } from 'react';
import styles from './styles.module.css';
import Button from '@common/Button/Button'

const BtnSaveClose = () => {
    return(
        <div className={styles.contain}>
            <Button text = "Close" styles = "createSchedule-close"/>
            <Button text = "Save" styles = "createSchedule-save"/>
        </div>
    );

};

export default BtnSaveClose