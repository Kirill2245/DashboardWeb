
import styles from './styles.module.css';
import ProductSales from '@common/ProductSales/ProductSales'
import Reports from './Reports/Reports';
import {fetch_productUser} from '@api/user_requests.js'
import { useEffect, useState } from 'react';
const MainChart = ({idUser}) => {
    const [listProduct, SetListProduct] = useState([])
    const [listSales, SetListSales] = useState([])
    const sortByTime = (array) => {
        return [...array].sort((a, b) => {
            const timeA = a.dateSales.split('T')[1].split('.')[0]; 
            const timeB = b.dateSales.split('T')[1].split('.')[0]; 
            return timeA.localeCompare(timeB);
            });
    };
    useEffect(() => {
        const fetch_data = async() => {
            try{
                const result = await fetch_productUser(idUser)
                SetListProduct(result.product )
            }
            catch(error){
                alert('Error get product information :(', error)
                console.error(error)
            }
        }
        fetch_data()
    },[idUser])
    useEffect(() => {
        SetListSales(sortByTime(listProduct.flatMap(item => item.salesInfo)))
    },[listProduct])
    return(
        <div className= {styles.contain}>
            <Reports salesData = {listSales}/>
            <ProductSales idUser = {idUser} title = "Analytics" flagSection = {false}  widthChart = {216} heightChart = {216}/>
        </div>
    );
};

export default MainChart