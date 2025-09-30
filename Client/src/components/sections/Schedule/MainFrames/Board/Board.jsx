// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import BoardSection from './BoardSection/BoardSection';
import styles from './styles.module.css';
import { sortTasksByStatus } from '@lib/SortedTask';
const Board = ({data}) => {
    const [sortedObjTask, setObjTask] = useState({})
    
    useEffect(() => {
        setObjTask(sortTasksByStatus(data))
    },[data])
    return(
        <section className= {styles.contain}>
            <BoardSection name="ToDo" data={sortedObjTask.Pending || []}/>
            <BoardSection name = "In Progress" data={sortedObjTask.Running || []}/>
            <BoardSection name = "In Review" data={sortedObjTask.Review || []}/>
            <BoardSection name = "Done" data={sortedObjTask.Done || []}/>
        </section>
    );
};

export default Board