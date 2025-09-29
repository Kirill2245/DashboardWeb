// import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Section from './Section/Section';
const TimeLine = () => {

    return(
        <section className= {styles.section}>
            <Section name = 'To Do' type = 'ToDo'/>
            <Section name = 'Doing' type = 'Doing'/>
            <Section name = 'Done' type ='Done'/>
        </section>
    );
};

export default TimeLine