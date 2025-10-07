import {  useEffect, useState } from 'react';
import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo'
import ArrowRight from '@image/ArrowRight.svg'
import ArrowRightNoActive from '@image/ArrowRightNoActive.svg'
const SideBar = ({setIdSelectNav}) => {
    const navName = ['To Do ', 'Doing ', 'Done']
    const [idNavBtn, setIdNavBtn] = useState(0)
    useEffect(() => {
        setIdSelectNav(idNavBtn)
    },[idNavBtn,setIdSelectNav])
    return(
        <aside className= {styles.sideBar}>
            <nav>
                {navName.map((item,index)=>(
                    <ButtonLogo text = {item} image = {idNavBtn === index ? ArrowRight :ArrowRightNoActive} styles = {idNavBtn === index ? 'TimeLineBtn-active':'TimeLineBtn'} key = {index} onClick = {() => setIdNavBtn(index)}/>
                ))}
            </nav>
        </aside>
    );
};

export default SideBar