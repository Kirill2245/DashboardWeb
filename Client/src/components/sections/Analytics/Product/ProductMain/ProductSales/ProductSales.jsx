import {fetch_productUser} from '@api/user_requests.js';
import { useEffect, useState } from 'react';
import PieChart from './Chart/PieChart';
import styles from './styles.module.css'
import image from '@image/dot.svg';
const ProductSales = ({idUser}) => {
    const [listProduct, setList] = useState([])
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetch_data = async () => {
            try {
                const data = { userId: idUser };
                const response = await fetch_productUser(data);
                if (Array.isArray(response?.product)) {
                    setList(response.product);
                } else {
                    console.error('Ожидался массив product, но получено:', response);
                    setList([]);

                }
            } catch (err) {
                console.error('Ошибка при загрузке:', err);
                setList([]);
            }
        };

        fetch_data();
    }, [idUser]); 
    useEffect(() => {
        if (listProduct.length > 0) {
            const calculateValues = () => {
                let totalOrder = 0;
                let orderCancel = 0;
                let totalSales = 0;
                
                listProduct.forEach((item) => {
                    const soldCount = item.salesInfo?.reduce((sum, sale) => sum + (sale.count || 0), 0) || 0;
                    totalSales += (parseFloat(item.price?.$numberDecimal || 0) * soldCount);
                    totalOrder += (item.numberOrders || 0);
                    orderCancel += (item.numberCancel || 0);
                });
                
                const data = [orderCancel,totalSales,totalOrder];
                return data;
            };
            
            setChartData(calculateValues());
        }
    }, [listProduct]);

    return(
        <section className = {styles.section}>
            <div className= {styles.header}>
                <h3>Product Sales Analytics</h3>
                <img src = {image}></img>
            </div>
                <PieChart values={chartData}/>
            <div className={styles.containLabel}>
                <svg width="14px" height="14px">
                    <circle r = "7" cx = "7" cy = "7" fill='#5B93FF'/>
                </svg>
                <p>Total Sales</p>
                <svg width="14px" height="14px">
                    <circle r = "7" cx = "7" cy = "7" fill='#FFD66B'/>
                </svg>
                <p>Total Order</p>
                <svg width="14px" height="14px">
                    <circle r = "7" cx = "7" cy = "7" fill='#FF8F6B'/>
                </svg>
                <p>Order Cancel</p>
            </div>
        </section>
    );
};
export default ProductSales