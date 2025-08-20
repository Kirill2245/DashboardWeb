import CreateForm from './CreateForm/CreateForm';
import Preview from './Preview/Preview';
import styles from './styles.module.css';
import backBtn from '@image/backbtn.svg';
const InvoiceCreate = ({isCreate}) => {
    return(
        <div className= {styles.containSection}>
            <section className= {styles.section}>
                <div className = {styles.contain}>
                    <img src = {backBtn} onClick={isCreate}/>
                    <h2>Create New Invoice</h2>
                </div>
            <CreateForm isCreate = {isCreate}/>
            </section>
            
            <Preview/>
        </div>
    );
};

export default InvoiceCreate