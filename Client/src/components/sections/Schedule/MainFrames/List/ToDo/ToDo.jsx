// import { useEffect, useState } from 'react';
import Table from '../Table/Table';
import styles from './styles.module.css';
const ToDo = () => {

    return(
        <section className= {styles.contain}>
            <header><h3>To Do </h3><p>See More</p></header>
            <Table/>
        </section>
    );
};

export default ToDo