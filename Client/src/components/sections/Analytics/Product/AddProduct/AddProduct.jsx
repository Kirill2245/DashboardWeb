import styles from './styles.module.css';
import backBtn from '@image/backbtn.svg';
import imageAdd from '@image/imageAdd.svg';
import { useState, useEffect } from "react";
import AddForm from './AddForm/AddForm'
const AddProduct = ({isClose, isOverlay}) => {
    const [isVisible, setIsVisible] = useState(false);
    const closed = () =>{
        isClose();
        isOverlay(false)
    }
    useEffect(() => {
        setIsVisible(true);
    }, []);
    return(
        <section className = {`${styles.section} ${isVisible ? styles.sectionVisible : ""}`}>
            <div className = {styles.contain}>
                <img src = {backBtn} onClick={closed}/>
                <h3>Add a New Product</h3>
            </div>
            <img src = {imageAdd}/>
            <AddForm/>
        </section>
    );
};
export default AddProduct;