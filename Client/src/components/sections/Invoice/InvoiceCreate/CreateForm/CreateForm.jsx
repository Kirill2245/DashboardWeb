import styles from './styles.module.css';
import imageAdd from '@image/imageAdd.svg';
import calendar from '@image/CalendarA.svg';
import location from '@image/location.svg';
import { useState, useRef} from 'react';
import MapModal from './MapModal/MapModal';
import ProductDescription from './ProductDescription/ProductDescription';
import Button from '@common/Button/Button';
const CreateForm = () => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [address, setAddress] = useState('');

    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress);
    };
    const dateInputRef = useRef(null);

    const handleCalendarClick = () => {
        dateInputRef.current?.click();
    };
    return(
        <form className = {styles.form}>
            <img src= { imageAdd } className = {styles.imageAdd}/>
            <div className = {styles.contain}>
                <label>
                    <span>Invoice Id</span>
                    <input placeholder='#876370' type='text'/>
                </label>
                <label className={styles.labelContain}>
                    <span>Date</span>
                    <input placeholder='01/12/2021' type='date' className={styles.dateInput} ref={dateInputRef}/>
                    <button type="button" onClick={handleCalendarClick}>
                        <img src={calendar} alt="Calendar" onClick={handleCalendarClick}/>
                    </button>
                </label>
            </div>
            <label className = {styles.labelName}>
                <span>Name</span>
                <input placeholder='Alison G.' type='text'/>
            </label>
            <div className = {styles.contain}>
                <label>
                    <span>Email</span>
                    <input type='email' placeholder='Example@gmail.com'/>
                </label>
                <label className = {styles.labelContain}>
                    <span>Address</span>
                    <input type='text' placeholder='Street' value={address} onChange={(e) => setAddress(e.target.value)}/>
                    <button type="button" onClick={() => setIsMapOpen(true)}>
                        <img src = {location}/>
                    </button>
                </label>
            </div>
            <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} onAddressSelect={handleAddressSelect}/>
            <ProductDescription/>
            <div className = {styles.buttonContain}>
                <Button text = "Send Invoice" styles = "sendInvoice"/>
                <Button text = "Create Invoice" styles = "createInvoice"/>
            </div>
        </form>

    );
};

export default CreateForm