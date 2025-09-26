
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
const FindTime = ({isSave, SelectRange}) => {
    const [formData, SetFormData] = useState({startTime:'', endTime: ''})
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        SetFormData(prev => ({...prev, [name]:value}))
    }
    useEffect(() => {
        if (formData.startTime && formData.endTime) {
            SelectRange(formData)
        }
    },[SelectRange,formData])
    return(
        <div className={styles.contain}>
            <div>
                <input type="time" value={formData.startTime} onChange={handleInputChange} name="startTime"/>
                <span>-</span>
                <input type="time" value={formData.endTime} onChange={handleInputChange}  name="endTime"/>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={isSave}>
                <circle cx="10" cy="10" r="10" fill="#FF8F6B"/>
                <path d="M5 10L9 14L15 6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
        </div>
    );

};

export default FindTime