// import { useState } from 'react';
import styles from './styles.module.css';
import iconSearch from '@image/iconSearch.svg';
import backBtn from '@image/CloseFrame.svg';
import Addbaton from '@image/Addbaton.svg';
import testImg from '@image/2.jpg'
const FrameAddPeople = ({isClose}) => {
    const test = [{name:"test", fullName:"123"},{name:"test", fullName:"122334344343343434"},{name:"test", fullName:"123"}]
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
                    {test.map((item,index) => (
                        <div key = {index}><img src = {testImg}/><p>{`${item.name} ${item.fullName}`}</p><img src = {Addbaton} /></div>
                        
                    ))}
                </div>
            </div>
        </div>

    );

};

export default FrameAddPeople