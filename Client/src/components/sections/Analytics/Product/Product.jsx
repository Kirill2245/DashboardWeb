import CalendarButton from '@common/CalendarButton/CalendarButton';
import styles from './styles.module.css';
import ProductMain from './ProductMain/ProductMain';
import { useEffect, useState } from 'react';
import BoxButton from './BoxButton/BoxButton';

const Product = () => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    useEffect(()=>{
        if(startDate && endDate){console.log(startDate,endDate)}
        
    },[startDate,endDate])
    return(
        <section className = {styles.section}>
            <header className = {styles.header}>
                <h3>Product Analytics</h3>
                <div className = {styles.contain}>
                    <CalendarButton text ="start-date" setDate = {setStartDate}/>
                    <CalendarButton text ="end-date" setDate = {setEndDate}/>                   
                </div>
            </header>
            <BoxButton/>
            <ProductMain startDate={startDate} endDate={endDate}/>
        </section>
    );
};

export default Product