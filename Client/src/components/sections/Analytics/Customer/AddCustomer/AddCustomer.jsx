import FormCustomer from './FormCustomer/FormCustomer';
import styles from './styles.module.css';
import CloseFrame from '@image/CloseFrame.svg'
const AddCustomer = ({isClose}) => {
    return(
        <section className= {styles.section}>
            <header>
                <h3>Add Customer</h3>
                <img src = {CloseFrame} onClick={isClose}/>
            </header>
            <FormCustomer/>
        </section>
    );
};

export default AddCustomer