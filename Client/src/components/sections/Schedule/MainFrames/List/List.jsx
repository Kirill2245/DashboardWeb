import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Section from './Section/Section';
import { sortTasksByStatus } from '@lib/SortedTask';
const List = ({data}) => {
    const [sortedObjTask, setObjTask] = useState({})
    
    useEffect(() => {
        setObjTask(sortTasksByStatus(data))
    },[data])
    useEffect(() => {console.log(sortedObjTask)},[sortedObjTask])
    return(
        <section className= {styles.section}>
            <Section name = 'To Do'  data={sortedObjTask.Pending || []}/>
            <Section name = 'Doing'  data={sortedObjTask.Running || []}/>
            <Section name = 'Done'   data={sortedObjTask.Done || []}/>
        </section>
    );
};

export default List