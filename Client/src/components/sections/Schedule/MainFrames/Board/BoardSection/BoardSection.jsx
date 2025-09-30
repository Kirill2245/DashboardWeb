// import { useEffect, useState } from 'react';
import CardTask from './CardTask/CardTask';
import styles from './styles.module.css';
import test from '@image/2.jpg';
const BoardSection = ({name}) => {
    return(
        <div className= {styles.contain}>
            <header className= {styles.header}><h3>{name}</h3></header>
            <div className={styles.cardBox}>
                <CardTask title={'Dashboard Design '} tag = {'Low'} description={'Discussion for management dashboard ui design'} countMember={5} image={test}/>
            </div>
        </div>
    );
};

export default BoardSection