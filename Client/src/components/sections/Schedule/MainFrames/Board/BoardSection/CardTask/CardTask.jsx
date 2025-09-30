// import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Menu from '@image/Menu.svg';
import AddUser from '@image/AddUser.svg';
import test from '@image/2.jpg';
import Chat from '@image/Chat.svg';
import Heart from '@image/Heart.svg'
const CardTask = ({title, tag, description = 'None', countMember = 0, image, likeCount = 0}) => {
    const imgList = [Chat, Heart]
    const IndexZ = 1000
    return(
        <div className= {styles.contain}>
            <header><input type='checkbox'/><h4>{title}</h4><img src={Menu}/></header>
            {tag && <div className={styles.tag}>{tag}</div>}
            {description && <p>{description}</p>}
            {image && <img src={`https://localhost:5000${image}`} className={styles.imgTask}/>}
            <footer>
                <figure style={{width:28 + (15 * countMember)}}>
                    {Array.from({ length: countMember }).map((_, index) => (
                        <img src = {test} key={index} style={{zIndex:IndexZ + index, left:15 * index}}/>
                    ))}
                    <img src = {AddUser} style={{zIndex:1111 + countMember, top:0, left:15*countMember}}/>
                </figure>
                <div className={styles.box}>
                    {imgList.map((item, index) => (
                        <div>
                            <img src = {item} key={index}/>
                            <p>{item == Chat ? '123' : likeCount }</p>
                        </div>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default CardTask