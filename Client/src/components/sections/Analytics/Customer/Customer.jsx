import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo';
import logo from '@image/Plus.svg'
import { useState } from 'react';
import Table from './Table/Table';
import Profile from './Profile/Profile';
import AddCustomer from './AddCustomer/AddCustomer';
const Customer = ({userId}) => {
    const [showProfile, isShowProfile] = useState(false)
    const [showAddCustomer, isShowAddCustomer] = useState(false)
    const [dataFromProfile, setDataFromProfile] = useState(null);
    const handleClickAdd = () => {
        isShowProfile(false)
        isShowAddCustomer(true)
    }
    const handleClickProfile = () => {
        isShowProfile(e => !e)
        isShowAddCustomer(false)        
    }
    const handleDataFromProfile = (data) => {
        setDataFromProfile(data)
    }
    return(
        <section className= {styles.section}>
            <div className={styles.main}>
                <header>
                    <h2>Customer List</h2>
                    <ButtonLogo text = "Add Customer" image = {logo} styles = "addCustomer" onClick = {handleClickAdd}/>
                </header>
                <Table showProfile={handleClickProfile} onDataSend={handleDataFromProfile} userId={userId}/>
            </div>
            {showProfile &&
                <aside className={styles.side}>
                    <Profile dataFromProfile={dataFromProfile}/>
                </aside>
            }
            {showAddCustomer &&
                <aside className={styles.sideAdd}>
                    <AddCustomer isClose={() => isShowAddCustomer(false)} idUser={userId}/>
                </aside>
            }
        </section>
    );
};

export default Customer