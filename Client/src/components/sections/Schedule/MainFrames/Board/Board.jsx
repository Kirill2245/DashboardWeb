// import { useEffect, useState } from 'react';
import BoardSection from './BoardSection/BoardSection';
import styles from './styles.module.css';
const Board = () => {

    return(
        <section className= {styles.contain}>
            <BoardSection name="ToDo"/>
            <BoardSection name = "In Progress"/>
            <BoardSection name = "In Review"/>
            <BoardSection name = "Done"/>
        </section>
    );
};

export default Board