import { useState, useCallback } from 'react';
import BtnContain from '../BtnContain/BtnContain';
import Input from '../Input/Input';
import styles from './styles.module.css';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import SelectTime from '../SelectTime/SelectTime';
import MapModal from '@common/MapModal/MapModal';
import FrameAddPeople from '../FrameAddPeople/FrameAddPeople';
import FrameAddImageTags from './FrameAddImageTags/FrameAddImageTags';
import { fetch_addTask } from '@api/task_request';
const FormTask = ({selectDate, userId}) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isAddPeopleOpen, setIsAddPeople] = useState(false);
    const [formData, setFormData] = useState({
        userId:'',
        address: '',
        usersList: [],
        timeRange: { startTime: '', endTime: '' },
        title: '',
        description:'',
        date:selectDate,
        tags:'',
        image:null
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
    const handleImageChange = useCallback((image) => {
        setFormData(prev => ({
            ...prev,
            'image': image
        }));
    }, []);
    const fetch_data = async(data) => {
        try{
            const result = await fetch_addTask(data, userId)
            console.log('Result --',result)
            if (result && result.success){
                alert('Created event successfully !!!')
            }
            else{
                alert('Error created task :(')
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
            memberList: formData.usersList,
            date: formData.date,
            startTime: formData.timeRange.startTime,
            endTime: formData.timeRange.endTime,
            description:formData.description,
            tags:formData.tags,
            image:formData.image
        };
        fetch_data(submitData)
        console.log('Данные для отправки:', submitData);
    };
    return(
        <form className= {styles.form} onSubmit={handleSubmit}>
            <Input Change = {handleInputChange} name = 'title' value = {formData.title}/>
            <Input Change = {handleInputChange} name = 'description' value = {formData.description} placeholder='Description'/>
            <SelectTime SetTimeRange = {handleSelectRange}/>
            <BtnContain IsMapOpen = {() => setIsMapOpen(true)} IsAddPeopleOpen = {() => setIsAddPeople(true)}/>
            <FrameAddImageTags Change={handleInputChange} value={formData.tags} ChangeImage={handleImageChange}/>
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