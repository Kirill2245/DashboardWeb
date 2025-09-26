// import { useState } from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import TimeCircle from '@image/TimeCircle.svg'
import FindTime from './FindTime/FindTime';
const SelectTime = ({SetTimeRange}) => {
    const [findTime, isFindTime] = useState(false)
    const [selectTimeRange,SetRange] = useState({startTime:'12:00', endTime:'1:00'})
    const handleSelectRange = (rangeTime) => {
        SetRange(rangeTime);
        SetTimeRange(rangeTime)
    }
    useEffect(() => {SetTimeRange(selectTimeRange)},[SetTimeRange, selectTimeRange])
    return(
        <div className={styles.contain}>
            <div className={styles.box}>
                <div>
                    <img src = {TimeCircle}/>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.1" width="40" height="40" rx="20" fill="#FF8F6B"/>
                    </svg>
                </div>
                <article>
                    <h4>{`Thursday. December 5      ${selectTimeRange.startTime}pm    -    ${selectTimeRange.endTime}pm`}</h4>
                    <p>Time zone - Does not repeat</p>
                </article>
            </div>
            {findTime ? <FindTime isSave={() => isFindTime(false)} SelectRange={handleSelectRange}/> : <span onClick={() => isFindTime(true)}>Find a  time</span>}
        </div>
    );

};

export default SelectTime