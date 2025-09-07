
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import addInvoice from '@image/addinvoice.svg'
const  Table = ({onProductListUpdate, list}) => {
    const [data, setData] = useState(
        list && list.length > 0 
            ? list.map(item => ({
                id: item._id || item.id,
                name: item.name,
                brand: item.brand,
                price: parseFloat(item.price?.$numberDecimal || item.price || 0),
                qty: 0
            }))
            : [] 
    );
    const [productList, setProduct] = useState([]);
    const increaseQty = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], qty: newData[index].qty + 1 };
            return newData;
        });
    };

    const decreaseQty = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            if (newData[index].qty > 0) {
                newData[index] = { ...newData[index], qty: newData[index].qty - 1 };
            }
            return newData;
        });
    };

    const addToSelectedItems = (item) => {
        if (item.qty > 0) {
            setProduct(prev => {
                if (prev.some(selector => selector.id === item.id)) {
                    alert("Товар уже добавлен");
                    return prev; 
                } else {
                    return [...prev, { id: item.id, count: item.qty, name: item.name, price: item.price }];
                }
            });
        } else {
            alert('Установите количество больше 0');
        }
    };

    useEffect(() => {
        onProductListUpdate(productList)
    }, [productList, onProductListUpdate]);
    useEffect(() => {
        if (list && list.length > 0) {
            setData(
                list.map(item => ({
                    id: item._id || item.id,
                    name: item.name,
                    brand: item.brand,
                    price: parseFloat(item.price?.$numberDecimal || item.price || 0),
                    qty: 0
                }))
            );
        }
    }, [list]);
    return(
        <table className= {styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className={styles.row}>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.price}</td>
                        <td>
                            <div className={styles.contain} style={item.qty !== 0 ? { backgroundColor: '#30a04727', color:'#3A974C' } : {backgroundColor: '#0302293d'}}>
                                <span onClick={() => decreaseQty(index)}>-</span> 
                                {item.qty} 
                                <span onClick={() => increaseQty(index)}>+</span>
                            </div>
                        </td>
                        <td><img src = {addInvoice} onClick={() => addToSelectedItems(item)}/></td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
};

export default Table