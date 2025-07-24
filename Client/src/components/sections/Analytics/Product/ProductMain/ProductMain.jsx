import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';

import {rangeDate} from '@lib/rangeDate.js'
import TotalProduct from './TotalProduct/TotalProduct';
const ProductMain = ({startDate, endDate}) => {
    const [listProduct, setProduct] = useState([])
    const testArr = useMemo(() => [
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
    useEffect(() => {
        try {
            const filteredList = rangeDate(testArr, startDate, endDate);
            setProduct(filteredList);
            console.log(filteredList)
        } 
        catch (error) 
        {
            console.error('Date filtering error:', error);
            setProduct([]);
        }
    }, [startDate, endDate, testArr]);
    return(
        <div className= {styles.main}>
            <div className= {styles.containOne}>
                <div className={styles.containTotal}>
                    <TotalProduct date={listProduct}/>
                </div>
            </div>
            <div className= {styles.containTwo}>
                <></>
                <></>
            </div>
        </div>
    );
};

export default ProductMain