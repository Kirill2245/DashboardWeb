// import { useState } from 'react';
import styles from './styles.module.css';
import iconSearch from '@image/iconSearch.svg';
import backBtn from '@image/CloseFrame.svg';
import Addbaton from '@image/Addbaton.svg';
import testImg from '@image/2.jpg';
import { fetch_AllUsers } from '@api/user_requests';
import { useEffect, useState } from 'react';
const FrameAddPeople = ({isClose, SelectedUsers}) => {
    const [users, setUsers] = useState([])
    const [usersList, SetUsersList] = useState([])
    const selectUser = (item) => {
        SetUsersList(prev => {
            const userId = item.id || item._id;
            if(prev.some(selector => selector === userId)){
                alert("The user has already been added")
                return prev
            }
            else{
                return [...prev, userId]
            }
        })
    }
    useEffect(() => {
        const fetch_data = async() => {
            try{
                const result = await fetch_AllUsers();
                console.log(result)
                setUsers(result.response)
            }
            catch(error){
                console.error("Error receiving users data:", error)
                alert("Error receiving users data")
            }
        }
        fetch_data()
    },[])
    useEffect(() => {
        SelectedUsers(usersList)
    },[SelectedUsers,usersList])
    return(
        <div className={styles.overlay}>
            <div className={styles.frame}>
                <header>
                    <div>
                        <img src = {iconSearch}/>
                        <input type='text' placeholder='Search'/>
                    </div>
                    <img src={backBtn} onClick={isClose}/>
                </header>
                <div className={styles.userList}>
                    {users.map((item,index) => (
                        <div key = {index}><img src = {testImg}/><p>{`${item.name} ${item.fullName}`}</p><img src = {Addbaton} onClick={() => {selectUser(item)}}/></div>
                    ))}
                </div>
            </div>
        </div>

    );

};

export default FrameAddPeople