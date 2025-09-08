
import styles from './styles.module.css';
import menu from '@image/Menu.svg'
import Table from './Table/Table';
import TopProduct from './TopProduct/TopProduct';
import { useEffect, useState } from 'react';
import {sortProduct} from '@lib/sortProduct.js';
const StatsProduct = ({idUser, listProduct}) => {
    const [topProduct, setTopProduct] = useState([])
    useEffect(() => {
        const sort = sortProduct(listProduct)
        console.log(sort, "---sort")
        setTopProduct(sort)
    }, [listProduct])
    return(
        <div className= {styles.contain}>
            <div className={styles.box}>
                <header>
                    <h4>Recent Orders</h4>
                    <img src = {menu}/>
                </header>
                <Table idUser={idUser}/>
            </div>
            <div className={styles.box}>
                <header>
                    <h4>Top Selling Products</h4>
                    <img src = {menu}/>
                </header>
                <div className={styles.containTopProduct}>
                    <TopProduct topProduct={topProduct[0]}/>
                    <TopProduct topProduct={topProduct[1]}/>
                </div>
            </div>
        </div>
    );
};

export default StatsProduct