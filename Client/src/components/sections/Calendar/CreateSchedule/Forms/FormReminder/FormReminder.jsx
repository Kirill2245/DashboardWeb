import { useState, useCallback } from 'react';
import styles from './styles.module.css';
import Input from '../Input/Input';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import SelectTime from '../SelectTime/SelectTime';
import { fetch_addReminder } from '@api/reminder_request';
const FormReminder = ({selectDate, userId}) => {
    const [formData, setFormData] = useState({
        timeRange: { startTime: '', endTime: '' },
        title: '',
        date:selectDate
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSelectRange = useCallback((rangeTime) => {
        setFormData(prev => ({
            ...prev,
            timeRange: rangeTime
        }));
    }, []);
    const fetch_data = async(data) => {
        try{
            const result = await fetch_addReminder(data, userId)
            if (result && result.success){
                alert('Created reminder successfully !!!')
            }
            else{
                alert('Error created event :(')
            }
        }
        catch(error){
            alert('Invalid error -',{error})
            console.error(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.title) {
            alert('Please specify the name of the reminder.');
            return;
        }
        
        
        if (!formData.date) {
            alert('Please select a date.');
            return;
        }
        const submitData = {
            title: formData.title,
            date: formData.date,
            startTime: formData.timeRange.startTime,
            endTime: formData.timeRange.endTime,
        };

        console.log('Данные для отправки:', submitData);
        fetch_data(submitData)
    };

    return(
        <form className= {styles.form} onSubmit={handleSubmit}>
            <Input Change={handleInputChange} value={formData.title} name = 'title'/>
            <SelectTime SetTimeRange={handleSelectRange}/>
            <BtnSaveClose/>
        </form>
    );

};

export default FormReminder