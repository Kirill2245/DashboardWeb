import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';

import {rangeDate} from '@lib/rangeDate.js'
import Total from './Total/Total';
import icon from '@image/icon-grup.svg'
import icon1 from '@image/icon1.png'
import TopSelling from './TopSelling/TopSelling';
import ProductAdd from './ProductAdd/ProductAdd';
import ProductSales from './ProductSales/ProductSales';
const ProductMain = ({startDate, endDate, idUser}) => {
    const [listProduct, setProduct] = useState([])
    const [listProduct2, setProduct2] = useState([])
    const testArr = useMemo(() => [
    {
        count: 30,
        date: new Date('2024-11-29')
    },
    {
        count: 10,
        date: new Date('2025-01-05')
    },
    {
        count: 20,  
        date: new Date('2025-02-10')
    },
    {
        count: 26,  
        date: new Date('2025-02-15')
    },
    {
        count: 25,
        date: new Date('2025-03-15')
    },
    {
        count: 35,
        date: new Date('2025-03-20')
    },
    {
        count: 7,
        date: new Date('2025-04-20')
    },
    {
        count: 32,
        date: new Date('2025-05-25')
    },
    {
        count: 18,
        date: new Date('2025-06-30')
    },
    {
        count: 5,
        date: new Date('2025-07-05')
    },
    {
        count: 12,
        date: new Date('2025-07-10')
    },
    {
        count: 42,  
        date: new Date('2025-07-15')
    },
    {
        count: 3,
        date: new Date('2025-08-23')
    },    {
        count: 112,
        date: new Date('2025-08-24')
    }

    ],[]);
    const testArr2 = useMemo(() => [
    {
        count: 5,
        date: new Date('2025-01-05')
    },
    {
        count: 25,  
        date: new Date('2025-02-10')
    },
    {
        count: 26,  
        date: new Date('2025-02-15')
    },
    {
        count: 25,
        date: new Date('2025-03-15')
    },
    {
        count: 15,
        date: new Date('2025-03-20')
    },
    {
        count: 7,
        date: new Date('2025-04-20')
    },
    {
        count: 22,
        date: new Date('2025-05-25')
    },
    {
        count: 18,
        date: new Date('2025-06-30')
    },
    {
        count: 10,
        date: new Date('2025-07-05')
    },
    {
        count: 12,
        date: new Date('2025-07-10')
    },
    {
        count: 32,  
        date: new Date('2025-07-15')
    },
    {
        count: 13,
        date: new Date('2025-08-23')
    },    {
        count: 92,
        date: new Date('2025-08-24')
    }

    ],[]);
    useEffect(() => {
        try {
            const filteredList = rangeDate(testArr, startDate, endDate);
            const filteredList2 = rangeDate(testArr2, startDate, endDate);
            setProduct(filteredList);
            setProduct2(filteredList2)
        } 
        catch (error) 
        {
            console.error('Date filtering error:', error);
            setProduct([]);
        }
    }, [startDate, endDate, testArr, testArr2]);
    return(
        <div className= {styles.main}>
            <div className= {styles.containOne}>
                <div className={styles.containTotal}>
                    <Total date={listProduct} image = {icon}/>
                    <Total date={listProduct2} image = {icon1} flag = {false}/>
                </div>
                <TopSelling idUser={idUser}/>
            </div>
            <div className= {styles.containTwo}>
                <ProductAdd/>
                <ProductSales idUser={idUser}/>
            </div>
        </div>
    );
};

export default ProductMain