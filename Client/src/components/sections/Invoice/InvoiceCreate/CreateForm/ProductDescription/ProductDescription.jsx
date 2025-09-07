
import { useState } from 'react';
import styles from './styles.module.css';
import Table from './Table/Table';
import image from '@image/addinvoice.svg'
import FrameProductAdd from './FrameProductAdd/FrameProductAdd';
const  ProductDescription= () => {
    const [showAddProduct, isShow] = useState(false)
    const [productList, setProductList] = useState([]);

    const handleProductListUpdate = (newProductList) => {
        setProductList(newProductList);
    };
    const addProductClick = () => {
        isShow(prev => !prev)
    }
    return(
        <div className= {styles.contain}>
            <header>
                <h3>Product Description</h3>
                <img src = {image} onClick={addProductClick}/>
                {showAddProduct&& <FrameProductAdd isShow={() => {isShow(false)}} onProductListUpdate={handleProductListUpdate}/>}
            </header>
            <Table data={productList}/>
        </div>
    );
};

export default ProductDescription