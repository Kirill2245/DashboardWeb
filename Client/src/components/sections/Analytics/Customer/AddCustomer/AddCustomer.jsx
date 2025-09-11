import FormCustomer from './FormCustomer/FormCustomer';
import styles from './styles.module.css';
import CloseFrame from '@image/CloseFrame.svg'
const AddCustomer = ({isClose, idUser}) => {
    return(
        <section className= {styles.section}>
            <header>
                <h3>Add Customer</h3>
                <img src = {CloseFrame} onClick={isClose}/>
            </header>
            <FormCustomer idUser={idUser}/>
        </section>
    );
};

export default AddCustomer