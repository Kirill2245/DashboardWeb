import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import {fetch_productUser} from '@api/user_requests.js';
import {rangeDate} from '@lib/rangeDate.js'
import {calculateSalesDifference, calculateProductDifference} from '@lib/SalesDifference.js'
import Total from './Total/Total';
import icon from '@image/icon-grup.svg'
import icon1 from '@image/icon1.png'
import TopSelling from './TopSelling/TopSelling';
import ProductAdd from './ProductAdd/ProductAdd';
import ProductSales from '@common/ProductSales/ProductSales'
const ProductMain = ({startDate, endDate, idUser}) => {
    const [listProduct1, setProduct] = useState([]);
    const [listProduct2, setProduct2] = useState([]);
    const [listProduct, setList] = useState([]);
    const [listSales, setListSales] = useState([])
    const [countSales, setCountSales] = useState(0)
    const [countProduct, setCountProduct] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    useEffect(() => {
        const fetch_data = async () => {
            try {
                console.log(typeof(idUser), idUser)
                const response = await fetch_productUser(idUser);
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
        try{
            let arr = []
            for (let elem of listProduct){
                for (let item of elem.salesInfo){
                    let data = {
                        sale: item.count * parseFloat(elem.price.$numberDecimal),
                        date: item.dateSales
                    }
                    arr.push(data)
                }
            }
            setListSales(arr)
            
            console.log(arr)
        }
        catch(err){
            console.error(err)
        }
    }, [listProduct])
    useEffect(() => {
        try {
            const filteredList = rangeDate(listProduct, startDate, endDate);
            const filteredList2 = rangeDate(listSales, startDate, endDate);
            setProduct(filteredList);
            setProduct2(filteredList2);
        } catch (error) {
            console.error('Date filtering error:', error);
            setProduct([]);
            setProduct2([]);
        }
    }, [startDate, endDate, listProduct, listSales]);
    useEffect(() => {
        setCountSales(calculateSalesDifference(listProduct2)[0])
        setTotalSales(calculateSalesDifference(listProduct2)[1])
        setTotalProduct(listProduct1.length)
        setCountProduct(calculateProductDifference(listProduct1))
    },[listProduct2, listProduct1])
    return(
        <div className= {styles.main}>
            <div className= {styles.containOne}>
                <div className={styles.containTotal}>
                    <Total date={listProduct1} image = {icon} total={totalProduct} count={countProduct}/>
                    <Total date={listProduct2} image = {icon1} flag = {false} count={countSales} total = {totalSales}/>
                </div>
                <TopSelling idUser={idUser}/>
            </div>
            <div className= {styles.containTwo}>
                <ProductAdd/>
                <ProductSales idUser={idUser} title = "Product Sales Analytics"  flagSection = {true}  widthChart = {176} heightChart = {176}/>
            </div>
        </div>
    );
};

export default ProductMain