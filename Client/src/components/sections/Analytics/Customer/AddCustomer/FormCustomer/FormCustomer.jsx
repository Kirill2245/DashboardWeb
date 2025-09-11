import styles from './styles.module.css';
import imageAdd from '@image/imageAdd.svg';
import {useRef, useState} from 'react';
import Button from '@common/Button/Button';
const FormCustomer = () => {
        const fileInputRef = useRef(null);
        // const [image, setImage] = useState(null);
        const [selectedOption, setSelectedOption] = useState('');
        const [preview, setPreview] = useState('');
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

            // setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    return(
        <form className= {styles.form}>
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
                <input/>
            </label>
            <label>
                Last Nameb 
                <input/>
            </label>
            <label>
                Email
                <input/>
            </label>
            <label>
                Phone Number
                <input/>
            </label>
            <label className={styles.selectContainer}>
                Gender
                <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select> 
            </label>
            <Button text = "Add Customer" styles = "createCustomer"/>
        </form>
    );
};

export default FormCustomer