import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo';
import logo from '@image/Plus.svg'
import InvoiceTable from './InvoiceTable/InvoiceTable';
import { useState } from 'react';
import { fetch_searchInvoice } from '@api/invoice_requests';
const InvoiseMain = ({idUser, isCreate}) => {
    const [nameId, setName] = useState('');
    const [invoiceList, setInvoice] = useState([])
    const handleSearch = async() => {
        try{
            if (nameId === ''){
                alert("Enter the id Invoice")
            }
            else{
                const result = await fetch_searchInvoice(idUser, nameId)
                console.log(result.data)
                setInvoice(result.data.invoice)
                if (result.data.invoice.length == 0){
                    alert("Nothing was found.")
                }
            }
        }
        catch(error){
            console.error('Error Search ', error)
            alert("Error Search :(")
        }
    }
    return(
        <section className= {styles.section}>
            <header>
                <h3>Invoice List</h3>
                <div className = {styles.containInput}>
                    <input type="text" placeholder="Search" value={nameId} onChange={(e) => setName(e.target.value)}/>
                    <button type="button" className = {styles.icon} onClick={handleSearch}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.6">
                            <path d="M6.14286 11.2857C8.98318 11.2857 11.2857 8.98318 11.2857 6.14286C11.2857 3.30254 8.98318 1 6.14286 1C3.30254 1 1 3.30254 1 6.14286C1 8.98318 3.30254 11.2857 6.14286 11.2857Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.0001 12.9999L10.4287 10.4285" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </button>
                </div>
                <ButtonLogo text = "Add New" image = {logo} styles = "addNew" onClick = {isCreate}/>
            </header>
            <InvoiceTable idUser={idUser} listInvoiceSearch={invoiceList}/>
        </section>
    );
};

export default InvoiseMain