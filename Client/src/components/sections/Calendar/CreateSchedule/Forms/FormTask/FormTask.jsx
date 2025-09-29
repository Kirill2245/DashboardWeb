import { useState, useCallback } from 'react';
import BtnContain from '../BtnContain/BtnContain';
import Input from '../Input/Input';
import styles from './styles.module.css';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import SelectTime from '../SelectTime/SelectTime';
import MapModal from '@common/MapModal/MapModal';
import FrameAddPeople from '../FrameAddPeople/FrameAddPeople';
import FrameAddImageTags from './FrameAddImageTags/FrameAddImageTags';
const FormTask = ({selectDate}) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isAddPeopleOpen, setIsAddPeople] = useState(false)
    const [formData, setFormData] = useState({
        userId:'',
        address: '',
        usersList: [],
        timeRange: { startTime: '', endTime: '' },
        title: '',
        date:selectDate
    });
    const handleAddressSelect = (selectedAddress) => {
        setFormData(prev => ({ ...prev, address: selectedAddress }));
    };
    const handleSelectUsers = (userList) => {
        setFormData(prev => ({
            ...prev,
            usersList: userList
        }));
    };
    const handleSelectRange = useCallback((rangeTime) => {
        setFormData(prev => ({
            ...prev,
            timeRange: rangeTime
        }));
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.title) {
            alert('Please specify the name of the event.');
            return;
        }
        
        
        if (!formData.date) {
            alert('Please select a date.');
            return;
        }

        const submitData = {
            title: formData.title,
            location: formData.address,
            userList: formData.usersList,
            date: formData.date,
            startTime: formData.timeRange.startTime,
            endTime: formData.timeRange.endTime,
        };

        console.log('Данные для отправки:', submitData);
    };
    return(
        <form className= {styles.form} onSubmit={handleSubmit}>
            <Input Change = {handleInputChange} name = 'title' value = {formData.title}/>
            <Input Change = {handleInputChange} name = 'title' value = {formData.title} placeholder='Description'/>
            <SelectTime SetTimeRange = {handleSelectRange}/>
            <BtnContain IsMapOpen = {() => setIsMapOpen(true)} IsAddPeopleOpen = {() => setIsAddPeople(true)}/>
            <FrameAddImageTags/>
            <BtnSaveClose/>
            <MapModal
                isOpen={isMapOpen} 
                onClose={() => setIsMapOpen(false)} 
                onAddressSelect={handleAddressSelect}
            />
            {isAddPeopleOpen && <FrameAddPeople isClose={() => setIsAddPeople(false)} SelectedUsers={handleSelectUsers}/>}
        </form>
    );

};

export default FormTask