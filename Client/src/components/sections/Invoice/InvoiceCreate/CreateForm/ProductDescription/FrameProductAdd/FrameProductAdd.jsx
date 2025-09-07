
import Table from './Table/Table';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
// import image from '@image/addinvoice.svg';
import { fetch_productUser } from '@api/user_requests';
import imageClose from '@image/CloseFrame.svg';
const  FrameProductAdd = ({isShow, onProductListUpdate, idUser}) => {
    const [productList, setProductList] = useState([]);
    const [data, setData] = useState([])
    const handleProductListUpdate = (newProductList) => {
        setProductList(newProductList);
    };
    useEffect(()=>{
        onProductListUpdate(productList)
    },[productList,onProductListUpdate])
    useEffect(() => {
        const fetch_data = async () => {
            try {
                const response = await fetch_productUser(idUser);
                if (Array.isArray(response?.product)) {
                    setData(response.product);
                    console.log(`${response}- product server`)
                } else {
                    console.error('Ожидался массив product, но получено:', response);
                    setData([]);

                }
            } catch (err) {
                console.error('Ошибка при загрузке:', err);
                setData([]);

            }
        };

        fetch_data();
    },[idUser])
    return(
        <div className= {styles.contain}>
            <header>
                <h3>Add Product</h3>
                <img src ={imageClose} onClick={isShow}/>
            </header>
            <Table onProductListUpdate={handleProductListUpdate} list={data}/>
        </div>
    );
};

export default FrameProductAdd