// import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import styles from './styles.module.css';
const Section = ({name, type}) => {

    return(
        <section className= {styles.contain}>
            <header><h3>{name}</h3><p>See More</p></header>
            <Table type = {type}/>
        </section>
    );
};

export default Section