
// import { useState } from 'react';
import styles from './styles.module.css';
import arrow from '@image/Arrow.svg'
import deleteImg from '@image/deleticon.svg';
const  Table= () => {
    const data = [
        { name: "ipod 20212", rate: '$1000', qty: "110 Pcs", amount: '$10,000' },
        { name: "ipod 2021", rate: '$1000', qty: "10 Pcs", amount: '$10,000' },
        { name: "ipod 2021", rate: '$10001', qty: "10 Pcs", amount: '$10,000' },
        { name: "ipod 2021", rate: '$1000', qty: "10 Pcs", amount: '$102,000' }
    ];
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
                {data.map((item, index) => (
                    <tr key={index} className={styles.row}>
                        <td>{item.name}</td>
                        <td>{item.rate}</td>
                        <td>{item.qty}</td>
                        <td>{item.amount}</td>
                        <td><img src = {deleteImg}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table