// import { useState } from 'react';
import styles from './styles.module.css';
import CalendarIcon from '@image/CalendarIcon.svg'
const Frame = () => {
    return(
        <div className={styles.contain}>
            <div className={styles.box}>
                <div>
                    <img src = {CalendarIcon}/>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.1" width="40" height="40" rx="20" fill="#FF8F6B"/>
                    </svg>
                </div>
                <article>
                    <h4>John Deo</h4>
                    <p>Busy  - Default visibllity - notity 30 minutes before</p>
                </article>
            </div>
        </div>
    );

};

export default Frame