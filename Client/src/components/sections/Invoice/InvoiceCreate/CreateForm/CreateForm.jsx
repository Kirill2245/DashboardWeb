import styles from './styles.module.css';
import imageAdd from '@image/imageAdd.svg';
import calendar from '@image/CalendarA.svg';
import location from '@image/location.svg';
import { useState, useRef} from 'react';
import MapModal from './MapModal/MapModal';
import ProductDescription from './ProductDescription/ProductDescription';
import Button from '@common/Button/Button';
import {fetch_addInvoice} from '@api/invoice_requests'
const CreateForm = ({idUser}) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [productList, setProductList] = useState([]);
    const [formData, setFormData] = useState({
        nameId: '',
        name: '',
        email: '',
        date: '',
        address: ''
    });

    const handleAddressSelect = (selectedAddress) => {
        setFormData(prev => ({ ...prev, address: selectedAddress }));
    };

    const dateInputRef = useRef(null);

    const handleCalendarClick = () => {
        dateInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.log('Файл не выбран');
            return;
        }

        const file = e.target.files[0];
        
        if (!file.type.match('image.*')) {
            console.error('Можно загружать только изображения');
            return;
        }

        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleProductListUpdate = (newProductList) => {
        setProductList(newProductList);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            
            if (image) {
                console.log('Adding image to FormData:', image.name, image.type, image.size);
                formDataToSend.append('image', image);
            } else {
                console.log('No image to add');
            }
            
            if (productList && productList.length > 0) {
                formDataToSend.append('productList', JSON.stringify(productList));
            }

            const response = await fetch_addInvoice(formDataToSend, idUser);
            console.log(response.data);
            alert("Invoice created successfully");
            
            setFormData({
                nameId: '',
                name: '',
                email: '',
                date: '',
                address: ''
            });
            setImage(null);
            setPreview('');
            setProductList([]);
        } catch (error) {
            console.error('Error create Invoice:', error);
            alert('Error create Invoice');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type='file'
                ref={fileInputRef}
                accept="image/*" 
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <img 
                src={preview || imageAdd} 
                className={styles.imageAdd}  
                onClick={handleImageClick}
                alt="Upload"
            />
            
            <div className={styles.contain}>
                <label>
                    <span>Invoice Id</span>
                    <input 
                        placeholder='#876370' 
                        type='text'
                        name="nameId"
                        value={formData.nameId}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.labelContain}>
                    <span>Date</span>
                    <input 
                        placeholder='01/12/2021' 
                        type='date' 
                        className={styles.dateInput} 
                        ref={dateInputRef}
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    <button type="button" onClick={handleCalendarClick}>
                        <img src={calendar} alt="Calendar" />
                    </button>
                </label>
            </div>
            
            <label className={styles.labelName}>
                <span>Name</span>
                <input 
                    placeholder='Alison G.' 
                    type='text'
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </label>
            
            <div className={styles.contain}>
                <label>
                    <span>Email</span>
                    <input 
                        type='email' 
                        placeholder='Example@gmail.com'
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.labelContain}>
                    <span>Address</span>
                    <input 
                        type='text' 
                        placeholder='Street' 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <button type="button" onClick={() => setIsMapOpen(true)}>
                        <img src={location} alt="Location" />
                    </button>
                </label>
            </div>
            
            <MapModal 
                isOpen={isMapOpen} 
                onClose={() => setIsMapOpen(false)} 
                onAddressSelect={handleAddressSelect}
            />
            
            <ProductDescription 
                idUser={idUser} 
                onProductListUpdate={handleProductListUpdate}
            />
            
            <div className={styles.buttonContain}>
                <Button text="Send Invoice" styles="sendInvoice" type="submit"/>
                <Button text="Create Invoice" styles="createInvoice" type="submit"/>
            </div>
        </form>
    );
};

export default CreateForm