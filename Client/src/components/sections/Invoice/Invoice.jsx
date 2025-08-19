import InvoiceMain from './InvoiceMain/InvoiceMain';
import styles from './styles.module.css';

const Invoise = ({idUser}) => {
    return(
        <section className= {styles.section}>
            <InvoiceMain idUser={idUser}/>
        </section>
    );
};

export default Invoise