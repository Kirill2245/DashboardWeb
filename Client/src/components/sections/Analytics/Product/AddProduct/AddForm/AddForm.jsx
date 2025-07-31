import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo.jsx';
import Download from '@image/Download.svg'
const AddForm = () => {

    return(
        <form className = {styles.form}>
            <label>
                Product Name
                <input/>
            </label>
            <label>
                Brand
                <input/>
            </label>
            <div className = {styles.contain}> 
                <label>
                    Price
                    <input/>
                </label>
                <label>
                    <input type='checkbox'/>
                    <span className={styles.checkboxIcon}>
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M10.4534 0.776579L4.71881 7.52603L1.41708 5.22274" 
                                stroke="white" 
                                strokeWidth="1.5"       
                                strokeLinecap="round"   
                                strokeLinejoin="round"  
                            />
                        </svg>
                    </span>
                    Negotiable
                </label>
            </div>  
            <label>
                Descriptions
                <textarea/>
            </label>   
            <ButtonLogo text = "Save Product" image = {Download} styles = "saveProduct"/>     
        </form>
    );
};
export default AddForm;