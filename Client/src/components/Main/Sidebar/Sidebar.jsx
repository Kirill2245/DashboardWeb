import Button  from '@common/Button/Button.jsx';
import Menu from './Menu/Menu';
import Profile from './Profile/Profile';
import styles from './styles.module.css';
import logo from '@image/Logo.svg'
import { useEffect, useState } from 'react';
import Update from './Update/Update';
const Sidebar = ({isOut , user, isButton}) => {
    const safeUser = user || { 
        name: '',
        fullName: '',
    };
    const [swap, isSwap] = useState(false)
    const [button, setButton] = useState(null)
    const handleButtonClick = (buttonName) => {
        setButton(buttonName)
    };
    useEffect(() =>{
        isButton(button)
    },[button,isButton])
    return(
        <>
            {swap ? 
                (
                <section className= {styles.collapsedSection}>
                    <div className= {styles.collapsedContain} onClick={() => {isSwap(!swap)}}>
                        <img src = {logo} ></img>
                        <h3>Base</h3>
                    </div>
                    <Menu isCollapsed ={true} onButtonClick={handleButtonClick}/>
                    <Profile name= {safeUser.name} fullname = {safeUser.fullName} isOut={isOut} isCollapsed = {true}/>
                </section>
                ):
                (
                <section className= {styles.section}>
                    <div className= {styles.contain} onClick={() => {isSwap(!swap)}}>
                        <img src = {logo} ></img>
                        <h3>Base</h3>
                    </div>
                    <Menu onButtonClick={handleButtonClick}/>
                    <Update/>
                    <Profile name= {safeUser.name} fullname = {safeUser.fullName} isOut={isOut} />
                </section>
                )
            }
        </>

    )
};

export default Sidebar