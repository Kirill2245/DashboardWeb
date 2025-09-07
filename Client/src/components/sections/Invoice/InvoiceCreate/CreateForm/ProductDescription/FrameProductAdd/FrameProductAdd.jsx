
import Table from './Table/Table';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
// import image from '@image/addinvoice.svg';
import imageClose from '@image/CloseFrame.svg';
const  FrameProductAdd = ({isShow, onProductListUpdate}) => {
    const [productList, setProductList] = useState([]);

    const handleProductListUpdate = (newProductList) => {
        setProductList(newProductList);
    };
    useEffect(()=>{
        onProductListUpdate(productList)
    },[productList,onProductListUpdate])
    return(
        <div className= {styles.contain}>
            <header>
                <h3>Add Product</h3>
                <img src ={imageClose} onClick={isShow}/>
            </header>
            <Table onProductListUpdate={handleProductListUpdate}/>
        </div>
    );
};

export default FrameProductAdd