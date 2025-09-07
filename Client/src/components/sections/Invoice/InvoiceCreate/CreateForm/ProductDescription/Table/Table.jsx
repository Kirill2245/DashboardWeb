
import styles from './styles.module.css';
import arrow from '@image/Arrow.svg'
import deleteImg from '@image/deleticon.svg';
import { useEffect, useState } from 'react';
const  Table= ({data}) => {
    const [productList, setProduct] = useState([])
    const delateItem = (id) => {
        setProduct(prev => prev.filter(item => item.id !== id));
    }
    useEffect(()=>{
        setProduct(data)
    },[data])
    return(
        <table className= {styles.table}>
            <thead>
                <tr className={styles.headerRow}>
                    <th><div><span>Product Name</span><img src ={arrow}/></div></th>
                    <th><div><span>Rate</span><img src ={arrow}/></div></th>
                    <th><div><span>QTY</span><img src ={arrow}/></div></th>
                    <th><div><span>Amount</span><img src ={arrow}/></div></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {productList.map((item, index) => (
                    <tr key={index} className={styles.row}>
                        <td>{item.name}</td>
                        <td>{100}</td>
                        <td>{item.count}</td>
                        <td>{item.count * 100}</td>
                        <td><img src = {deleteImg} onClick={() => delateItem(item.id)}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table