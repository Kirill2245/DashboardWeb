import CalendarButton from '@common/CalendarButton/CalendarButton';
import styles from './styles.module.css';
import ProductMain from './ProductMain/ProductMain';
import { useState } from 'react';
import BoxButton from './BoxButton/BoxButton';
import AddProduct from './AddProduct/AddProduct';

const Product = ({isOverlay}) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [addVisible, isVisible] = useState(false)

    return(
        <section className = {styles.section}>
            <header className = {styles.header}>
                <h3>Product Analytics</h3>
                <div className = {styles.contain}>
                    <CalendarButton text ="start-date" setDate = {setStartDate}/>
                    <CalendarButton text ="end-date" setDate = {setEndDate}/>                   
                </div>
            </header>
            <BoxButton isOverlay={isOverlay} isVisible = {() => isVisible(true)}/>
            <ProductMain startDate={startDate} endDate={endDate}/>
            {addVisible && <AddProduct isClose = {() => isVisible(false)} isOverlay={isOverlay}/>}
        </section>
    );
};

export default Product