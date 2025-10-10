import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import iconSearch from '@image/iconSearch.svg';
import backBtn from '@image/backbtn.svg';
import TableUser from './TableUser/TableUser';
import { fetch_AllUsers } from '@api/user_requests';
const AddChats = ({isClose, userId}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [dataUsers, setDataUsers] = useState([]);
    useEffect(() => {
            setIsVisible(true);
        }, []);

    useEffect(() => {
        const fetch_data = async() => {
            try{
                const result = await fetch_AllUsers();
                setDataUsers(result.response)
            }
            catch(error){
                console.error("Error receiving users data:", error)
                alert("Error receiving users data")
            }
        }
        fetch_data()
    },[])
    return(
        <section className= {`${styles.section} ${isVisible ? styles.sectionVisible : styles.sectionNoVisible}`}>
            <header>
                <img src={backBtn} onClick={isClose}/>
                <div>
                    <img src = {iconSearch}/>
                    <input type='text' placeholder='Search'/>
                </div>
            </header>
            <div className={styles.chatsList}>
                <TableUser dataUser={ dataUsers} userId={userId}/>
            </div>
        </section>
    );
};

export default AddChats