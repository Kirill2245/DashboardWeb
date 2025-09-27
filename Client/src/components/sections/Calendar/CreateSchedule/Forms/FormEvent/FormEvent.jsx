import {  useState,useCallback } from 'react';
import BtnContain from '../BtnContain/BtnContain';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import Frame from './Frame/Frame';
import Input from '../Input/Input';
import SelectTime from '../SelectTime/SelectTime';
import styles from './styles.module.css';
import MapModal from '@common/MapModal/MapModal';
import FrameAddPeople from '../FrameAddPeople/FrameAddPeople';
import { fetch_addEvent } from '@api/event_request';
const FormEvent = ({selectDate, userId}) => {
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
    const fetch_data = async(data) => {
        try{
            const result = await fetch_addEvent(data, userId)
            if (result && result.success){
                alert('Created event successfully !!!')
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
        fetch_data(submitData)
    };

    return(
        <form className= {styles.form} onSubmit={handleSubmit}>
            <Input Change = {handleInputChange} name = 'title' value = {formData.title}/>
            <SelectTime SetTimeRange = {handleSelectRange}/>
            <BtnContain IsMapOpen = {() => setIsMapOpen(true)} IsAddPeopleOpen = {() => setIsAddPeople(true)}/>
            <Frame/>
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

export default FormEvent