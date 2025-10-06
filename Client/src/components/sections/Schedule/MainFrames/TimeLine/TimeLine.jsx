// import { useEffect, useState } from 'react';
import Main from './Main/Main';
import SideBar from './SideBar/SideBar';
import styles from './styles.module.css';
const TimeLine = () => {

    return(
        <div className= {styles.contain}>
            <SideBar/>
            <Main/>
        </div>
    );
};

export default TimeLine