import { useRef, useState } from 'react';
import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo.jsx';
import Download from '@image/Download.svg';
import imageAdd from '@image/imageAdd.svg';
import { fetch_addProduct } from '@api/product_requests';

const AddForm = ({ idUser }) => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        negotiable: false,
        descriptions: '',
        userId: idUser 
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');

    const handleImageClick = () => {
        fileInputRef.current.click();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formDataToSend = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            if (image) {
                formDataToSend.append('image', image);
            }

            const response = await fetch_addProduct(formDataToSend);
            console.log('Продукт успешно добавлен:', response.data);
            alert('Продукт успешно добавлен !!!')

            setFormData({
                name: '',
                brand: '',
                price: '',
                negotiable: false,
                descriptions: '',
                userId: idUser
            });
            setImage(null);
            setPreview('');

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } 
        catch (error) {
            console.error('Ошибка при добавлении продукта:', error);
            alert('Ошибка при добавлении продукта:')
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.containImg}>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <img 
                    src={preview || imageAdd} 
                    onClick={handleImageClick} 
                    alt={preview ? "Превью изображения" : "Нажмите для загрузки"} 
                    style={{ cursor: 'pointer' }}
                />
            </div>
            
            <label>
                Product Name
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                />
            </label>
            
            <label>
                Brand
                <input 
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}                    
                    required
                />
            </label>
            
            <div className={styles.contain}> 
                <label>
                    Price
                    <input 
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        min="0"
                        step="0.01"
                        required
                    />
                </label>
                
                <label>
                    <input 
                        type='checkbox'
                        name="negotiable"
                        checked={formData.negotiable}
                        onChange={(e) => setFormData({...formData, negotiable: e.target.checked})}
                    />
                    <span className={styles.checkboxIcon}>
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M10.4534 0.776579L4.71881 7.52603L1.41708 5.22274" 
                                stroke="white" 
                                strokeWidth="1.5"       
                                strokeLinecap="round"   
                                strokeLinejoin="round"  
                            />
                        </svg>
                    </span>
                    Negotiable
                </label>
            </div>  
            
            <label>
                Descriptions
                <textarea
                    name="descriptions"
                    value={formData.descriptions}
                    onChange={(e) => setFormData({...formData, descriptions: e.target.value})}
                />
            </label>   
            
            <ButtonLogo 
                text="Save Product" 
                image={Download} 
                styles="saveProduct" 
                type="submit"
            />     
        </form>
    );
};

export default AddForm;