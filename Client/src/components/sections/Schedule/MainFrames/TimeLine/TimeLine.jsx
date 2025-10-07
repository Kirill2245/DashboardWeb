// import { useEffect, useState } from 'react';
import { useState } from 'react';
import Main from './Main/Main';
import SideBar from './SideBar/SideBar';
import styles from './styles.module.css';
const TimeLine = ({data}) => {
    const [idSelectNav, setIdSelectNav] = useState(0)
    const handleSelectId = (id) => {
        setIdSelectNav(id)
    }
    return(
        <div className= {styles.contain}>
            <SideBar setIdSelectNav={handleSelectId}/>
            <Main selectIdNav={idSelectNav} data={data}/>
        </div>
    );
};

export default TimeLine