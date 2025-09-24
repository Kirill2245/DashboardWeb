import { useEffect, useState } from 'react';
import BtnContain from '../BtnContain/BtnContain';
import BtnSaveClose from '../BtnSaveClose/BtnSaveClose';
import Frame from './Frame/Frame';
import Input from '../Input/Input';
import SelectTime from '../SelectTime/SelectTime';
import styles from './styles.module.css';
import MapModal from '@common/MapModal/MapModal';
import FrameAddPeople from '../FrameAddPeople/FrameAddPeople';
const FormEvent = () => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isAddPeopleOpen, setIsAddPeople] = useState(false)
    const [formData, setFormData] = useState({
        address: ''
    });
    const handleAddressSelect = (selectedAddress) => {
        setFormData(prev => ({ ...prev, address: selectedAddress }));
    };
    useEffect(() => {
        console.log("Address-", formData)
    },[formData])
    return(
        <form className= {styles.form}>
            <Input/>
            <SelectTime/>
            <BtnContain IsMapOpen = {() => setIsMapOpen(true)} IsAddPeopleOpen = {() => setIsAddPeople(true)}/>
            <Frame/>
            <BtnSaveClose/>
            <MapModal
                isOpen={isMapOpen} 
                onClose={() => setIsMapOpen(false)} 
                onAddressSelect={handleAddressSelect}
            />
            {isAddPeopleOpen && <FrameAddPeople isClose={() => setIsAddPeople(false)}/>}
        </form>
    );

};

export default FormEvent