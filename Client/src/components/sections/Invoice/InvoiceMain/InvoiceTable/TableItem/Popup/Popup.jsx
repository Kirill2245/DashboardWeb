import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo';
import editImg from '@image/Edit.svg';
import deleteImg from '@image/DeleteInvoice.svg';
const Popup = ({isEdit, editInvoice, isSave, currentStatus, isDelate}) => {
    return(
        <div className = {styles.popup}>
            {
                !editInvoice ? 
                <ButtonLogo text = 'Edit' styles = 'EditInvoice' image = {editImg} onClick = {isEdit}/> : 
                <ButtonLogo text = 'Save' styles = 'EditInvoice' image = {editImg} onClick = {() => isSave(currentStatus)}/>
            }
            <ButtonLogo text = 'Delete' styles = 'DeleteInvoice' image = {deleteImg} onClick = {isDelate}/>
        </div>
    );
};

export default Popup