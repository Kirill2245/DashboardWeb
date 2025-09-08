import CalendarButton from '@common/CalendarButton/CalendarButton';
import styles from './styles.module.css';
import HeaderStats from './HeaderStats/HeaderStats.jsx';
import MainChart from './MainChart/MainChart.jsx';
import StatsProduct from './StatsProduct/StatsProduct.jsx';
import { fetch_productUser } from '@api/user_requests.js';
import { useEffect, useState } from 'react';
import {rangeDate} from '@lib/rangeDate.js'
const Dashboard = ({idUser}) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [productList, setProduct] = useState([])
    const [filterProductList, setProductList] = useState([])
    const [filterSalesList, setSalesList] = useState([])
    const [dateHeader, setDateHeader] = useState([])
    useEffect(() => {
        const fetch_data = async() => {
            try{
                const response = await fetch_productUser(idUser);
                if (response){
                    setProduct(response.product)
                    console.log(response.product)
                }
                else{
                    alert("List product is void")
                }
            }   
            catch(error){
                console.error('Error get product', error)
            }
        }
        fetch_data()
    },[idUser])
    useEffect(() => {
        const filterDate = rangeDate(productList, startDate, endDate)
        let data = []
        for (let elem of productList){
            for (let i of elem.salesInfo){
                data.push({date: i.dateSales})
            }
        }
        const filterSale = rangeDate(data, startDate, endDate)
        setSalesList(filterSale)
        setProductList(filterDate)
    },[productList, startDate, endDate])
    useEffect(() => {
        setDateHeader({save:filterProductList.length,sales: filterSalesList.length})
    },[filterProductList, filterSalesList])
    return(
        <section className= {styles.section}>
            <header className={styles.header}>
                <h3>Dashboard</h3>
                <div className={styles.contain}>
                    <CalendarButton text ="start-date" setDate = {setStartDate}/>
                    <CalendarButton text ="end-date" setDate = {setEndDate}/>
                </div>
            </header>
            <div className={styles.main}>
                <HeaderStats list={dateHeader}/>
                <MainChart/>
                <StatsProduct/>
            </div>
        </section>
    );
};

export default Dashboard