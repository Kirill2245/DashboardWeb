import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import TableElement from './TableElement/TableElement';
import TableHeading from './TableHeading/TableHeading';
import {fetch_productUser} from '@api/user_requests.js';
import {sortProduct} from '@lib/sortProduct.js';
// import image1 from '@image/image.jpg'
const TopSelling = ({idUser}) => {
    const listName = ["SN", "Name", "Price", "Total Order", "Total Sales"]
    const [listProduct, setList] = useState([])
    useEffect(() => {
        const fetch_data = async () => {
            try {
                const data = { userId: idUser };
                const response = await fetch_productUser(data);
                if (Array.isArray(response?.product)) {
                    setList(sortProduct(response.product));

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

    //     const testData = [
    //     {
    //         name: "iPhone 15 Pro",
    //         image: image1,
    //         price: 9,
    //         order: 1115011,
    //         sales: 346660
    //     },
    //     {
    //         name: "Samsung Galaxy S23",
    //         image: image1,
    //         price: 799,
    //         order: 120,
    //         sales: 95880
    //     },
    //     {
    //         name: "Google Pixel 7",
    //         image: image1,
    //         price: 599,
    //         order: 90,
    //         sales: 53910
    //     },
    //     {
    //         name: "OnePlus 11",
    //         image: image1,
    //         price: 699,
    //         order: 85,
    //         sales: 59415
    //     },
    //     {
    //         name: "Xiaomi 13",
    //         image: image1,
    //         price: 499,
    //         order: 70,
    //         sales: 34930
    //     },
    //     {
    //         name: "Xiaomi 13",
    //         image: image1,
    //         price: 499,
    //         order: 70,
    //         sales: 34930
    //     },
    //     {
    //         name: "Xiaomi 13",
    //         image: image1,
    //         price: 499,
    //         order: 70,
    //         sales: 34930
    //     },
    //     {
    //         name: "Xiaomi 13",
    //         image: image1,
    //         price: 499,
    //         order: 70,
    //         sales: 34930
    //     }
    // ];
    return(
        <div className = {styles.section}>
            <article className= {styles.header}>
                <h3>Top Selling Products </h3>
                <p>See More</p>
            </article>
            <div className= {styles.headerTable}>
                {listName.map((name, index) => (
                    <TableHeading key = {index} text = {name}/>
                ))}
            </div>
            <div className = {styles.table}>
            {listProduct.map((item, index) => {
                const totalSold = item.salesInfo.reduce((sum, sale) => sum + sale.count, 0);
                const totalSales = parseFloat(item.price.$numberDecimal) * totalSold;
                return (
                    <TableElement 
                        key={index} 
                        position={index} 
                        name={item.name} 
                        image={item.image} 
                        price={parseFloat(item.price.$numberDecimal)} 
                        order={item.numberOrders} 
                        sales={totalSales}
                    />
                );
            })}
            </div>
            
        </div>
    );
};

export default TopSelling