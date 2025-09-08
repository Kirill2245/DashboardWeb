
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { fetch_recentOrders } from '@api/user_requests';
const Table = ({idUser}) => {
    const [listProductLast, setProduct] = useState([])
    useEffect(() => {
        const fetch_data = async() => {
            try{
                const response = await fetch_recentOrders(idUser)
                if (response && response.success){
                    setProduct(response.products)
                }
                else{
                    alert(response.message)
                }
            }
            catch(error){
                console.error("Error get product:", error)
            }
        }
        fetch_data()
    },[idUser])
    return(
        <table className= {styles.table}>
            <thead className={styles.headerRow}>
                <tr>
                    <th>Tracking no</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Total Order</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody className={styles.bodyRow}>
                {listProductLast.map((item,index) => {
                    return(
                        <tr key={index}>
                            <td>{item._id || item.id}</td>
                            <td><div><img src={`https://localhost:5000${item.image}`}/><span>{item.name}</span></div></td>
                            <td>{parseFloat(item.price?.$numberDecimal || item.price || 0)}</td>
                            <td><div>{item.numberOrders}</div></td>
                            <td>{parseFloat(item.numberOrders) * parseFloat(item.price?.$numberDecimal || item.price || 0)}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    );
};

export default Table