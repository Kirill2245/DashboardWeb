import styles from './styles.module.css';
import arrow from '@image/Arrow.svg';
import deleteImg from '@image/Delete.svg';
import TableItem from './TableItem/TableItem';
import { useState } from 'react';
import { useEffect } from 'react';
import {fetch_invoiceUser} from '@api/user_requests.js';
const InvoiseTable = ({idUser, listInvoiceSearch}) => {
    const [activeId, setActiveId] = useState(null); 
    const [invoiceList, setInvoice] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const handleItemClick = (id) => {
        setActiveId(activeId === id ? null : id); 
    };
    const handleSelectAll = (checked) => {
        setAllChecked(checked);
    };
    const dataToRender = listInvoiceSearch && listInvoiceSearch.length > 0 
        ? listInvoiceSearch 
        : invoiceList;
    useEffect(() => {
        const fetch_data = async() => {
            try{
                const response = await fetch_invoiceUser(idUser)
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
                <input type='checkbox' checked={allChecked} onChange={(e) => handleSelectAll(e.target.checked)}/>
                <span>Invoice Id<img src = {arrow}/></span>
                <span>Name<img src = {arrow}/></span>
                <span>Email<img src = {arrow}/></span>
                <span>Date<img src = {arrow}/></span>
                <span>Status<img src = {arrow}/></span>
                <img src = {deleteImg} className={styles.img}/>
            </header>
            <div className= {styles.contain}>
                {dataToRender.length > 0 ? (
                    dataToRender.map((item, index) => {
                        return(
                                <TableItem
                                id = {index}
                                isActive = {allChecked || activeId === index}
                                onClick = {() => handleItemClick(index)}
                                key={index}
                                idInvoice ={item.nameId}
                                name={item.name}
                                email={item.email}
                                date ={item.date ? item.date.split('T')[0] : 'No date'}
                                status={item.status}
                                image={item.image}
                                InvoiceId={item._id}
                                flag={item.elect}
                            />
                        )
                    })
                ):(
                    <div>No invoices found</div>
                )}
                
            </div>
        </section>
    )
};

export default InvoiseTable