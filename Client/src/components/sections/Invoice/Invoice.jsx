import { useState } from 'react';
import InvoiceMain from './InvoiceMain/InvoiceMain';
import styles from './styles.module.css';
import InvoiceCreate from './InvoiceCreate/InvoiceCreate';
const Invoise = ({idUser}) => {
    const [showCreate, isCreate] = useState(false)
    return(
        <section className= {styles.section}>
            {showCreate ? <InvoiceCreate isCreate = {() => {isCreate(false)}}/>:<InvoiceMain idUser={idUser} isCreate={() => {isCreate(true)}}/>}
        </section>
    );
};

export default Invoise