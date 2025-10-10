import styles from './styles.module.css';
import imageAdd from '@image/imageAdd.svg';
import {useRef, useState} from 'react';
import Button from '@common/Button/Button';
import { fetch_addCustomer } from '@api/customer_request';

const FormCustomer = ({idUser}) => {
        const fileInputRef = useRef(null);
        const [image, setImage] = useState(null);
        const [preview, setPreview] = useState('');
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            gender: ''
        });
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSelectChange = (e) => {
    setFormData(prev => ({
        ...prev,
        gender: e.target.value 
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
                formDataToSend.append('image', image);
            } else {
                console.log('No image to add');
            }
            const response = await fetch_addCustomer(formDataToSend, idUser);
            if (response.success === true){
                alert("Customer created successfully");
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    gender: ''
                });
                setImage(null);
                setPreview('');
            }
        } catch (error) {
            console.error('Error create Invoice:', error);
            alert('Error create Invoice');
        }
    };
    return(
        <form className= {styles.form} onSubmit={handleSubmit}>
            <input
                type='file'
                ref={fileInputRef} 
                accept="image/*" 
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <img 
                src={ preview ||imageAdd} 
                className={styles.imageAdd}  
                alt="Upload"
                onClick={handleImageClick}
            />
            <label>
                First Name
                <input 
                    type='text'
                    onChange={handleInputChange}
                    name='firstName'
                    value={formData.firstName}
                />
            </label>
            <label>
                Last Name 
                <input 
                    type='text'
                    onChange={handleInputChange}
                    name='lastName'
                    value={formData.lastName}
                />
            </label>
            <label>
                Email
                <input 
                    type='email' 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={handleInputChange}
                    name='email'
                    value={formData.email}
                />
            </label>
            <label>
                Phone Number
                <input 
                    type='tel' 
                    pattern="\+\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                    onChange={handleInputChange}
                    name='phoneNumber'
                    value={formData.phoneNumber}
                />
            </label>
            <label className={styles.selectContainer}>
                Gender
                <select
                    value={formData.gender}
                    onChange={handleSelectChange} 
                    name="gender" 
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select> 
            </label>
            <Button text = "Add Customer" styles = "createCustomer" type="submit"/>
        </form>
    );
};

export default FormCustomer