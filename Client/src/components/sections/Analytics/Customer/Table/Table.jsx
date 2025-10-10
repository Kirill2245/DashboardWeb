import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo';
import { useEffect, useState } from 'react';
import { fetch_customers } from '@api/user_requests';
const Table = ({showProfile, onDataSend, userId}) => {
    const [customerList, setCustomer] = useState([])
    useEffect(() => {
        const fetch_data = async() => {
            try{
                const response = await fetch_customers(userId)
                if (response.success === true){
                    setCustomer(response.customers)
                }
                else{
                    alert(`Error receiving customer data - ${response.message}`)
                }
            }
            catch(error){
                alert(`Error receiving customer data - ${error}`)
            }
        }
        fetch_data()
    },[userId])
    return(
        <div>
            <table className= {styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Gender</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.length === 0 ? (        
                        <tr>
                            <td colSpan="5" className={styles.noCustomers}>
                                No Customers
                            </td>
                        </tr>
                        ):
                        (
                        customerList.map((item, index) => {
                            return(
                                <tr onClick={() => {showProfile();onDataSend({email:item.email, phone:item.phoneNumber, name:`${item.firstName} ${item.lastName}`, img: `https://localhost:5000${item.image}` })}} key={index}>
                                    <td><div className={styles.box}><img src={`https://localhost:5000${item.image}`}/><p>{`${item.firstName} ${item.lastName}`}</p></div></td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td><div className={styles.boxGender}><p>{item.gender}</p></div></td>
                                    <td>
                                        <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.3">
                                            <path d="M13.4874 1.01257C12.804 0.329152 11.696 0.329152 11.0126 1.01257C10.3291 1.69598 10.3291 2.80402 11.0126 3.48744C11.696 4.17085 12.804 4.17085 13.4874 3.48744C14.1709 2.80405 14.1709 1.69601 13.4874 1.01257Z" fill="#030229"/>
                                            <path d="M8.23744 1.01257C7.55402 0.329152 6.44598 0.329152 5.76257 1.01257C5.07915 1.69598 5.07915 2.80402 5.76257 3.48744C6.44598 4.17085 7.55402 4.17085 8.23744 3.48744C8.92085 2.80405 8.92085 1.69601 8.23744 1.01257Z" fill="#030229"/>
                                            <path d="M2.98744 1.01257C2.30402 0.329152 1.19598 0.329152 0.512564 1.01257C-0.170852 1.69598 -0.170852 2.80402 0.512564 3.48744C1.19598 4.17085 2.30402 4.17085 2.98744 3.48744C3.67085 2.80405 3.67085 1.69601 2.98744 1.01257Z" fill="#030229"/>
                                            </g>
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })                            
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table