// import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import styles from './styles.module.css';
const Section = ({name, type , data}) => {

    return(
        <section className= {styles.contain}>
            <header><h3>{name}</h3><p>See More</p></header>
            <Table type = {type} data={data}/>
        </section>
    );
};

export default Section