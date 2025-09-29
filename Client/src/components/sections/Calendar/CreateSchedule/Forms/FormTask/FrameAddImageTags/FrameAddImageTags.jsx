import { useState, useRef } from 'react';
import styles from './styles.module.css';
import addImageIcon from '@image/addImageIcon.png'
import { useEffect } from 'react';
const FrameAddImageTags = ({Change, value, ChangeImage}) => {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
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
    useEffect(() => {
        ChangeImage(image)
    },[ChangeImage, image])
    return(
        <div className= {styles.frame}>
            <input
                type='file'
                ref={fileInputRef}
                accept="image/*" 
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <img 
                src={preview || addImageIcon} 
                className={styles.imageAdd}  
                onClick={handleImageClick}
                alt="Upload"
            />
            <input type='text' className={styles.input} placeholder='Tags...' name = 'tags' onChange={Change} value={value}/>
        </div>
    );
};

export default FrameAddImageTags