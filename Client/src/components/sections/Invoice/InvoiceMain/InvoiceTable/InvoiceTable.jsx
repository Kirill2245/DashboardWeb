import styles from './styles.module.css';
import arrow from '@image/Arrow.svg';
import deleteImg from '@image/Delete.svg';
import TableItem from './TableItem/TableItem';
import { useState } from 'react';
import { useEffect } from 'react';
import {fetch_invoiceUser} from '@api/user_requests.js';
const InvoiseTable = ({idUser}) => {
    const [activeId, setActiveId] = useState(null); 
    const [invoiceList, setInvoice] = useState([]);
    const handleItemClick = (id) => {
        setActiveId(activeId === id ? null : id); 
    };
    useEffect(() => {
        const fetch_data = async() => {
            try{
                const data = {
                    userId: idUser
                }
                const response = await fetch_invoiceUser(data)
                setInvoice(response)
                console.log(response)
            }catch (err) {
                console.error('Ошибка при загрузке:', err);
                setInvoice([]);
            }
        }
        fetch_data()
    },[idUser])
    return(
        <section className= {styles.section}>
            <header>
                <input type='checkbox'/>
                <span>Invoice Id<img src = {arrow}/></span>
                <span>Name<img src = {arrow}/></span>
                <span>Email<img src = {arrow}/></span>
                <span>Date<img src = {arrow}/></span>
                <span>Status<img src = {arrow}/></span>
                <img src = {deleteImg} className={styles.img}/>
            </header>
            <div className= {styles.contain}>
                {invoiceList.map((item, index) => {
                    return(
                        <TableItem
                            id = {0}
                            isActive = {activeId === 0}
                            onClick = {() => handleItemClick(0)}
                            key={index}
                            idInvoice ={item.nameId}
                            name={item.name}
                            email={item.email}
                            date ={item.date}
                            status={item.status}
                            image={item.image}
                            InvoiceId={item._id}
                        />
                    )
                })}
            </div>
        </section>
    );
};

export default InvoiseTable