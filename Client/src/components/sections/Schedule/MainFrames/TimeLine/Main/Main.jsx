// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Header from './Header/Header';
import AsideTime from './AsideTime/AsideTime';
import { sortTasksByStatus } from '@lib/SortedTask';
const Main = ({selectIdNav, data}) => {
    const [isDate,setDate] = useState(new Date().getDate())
    const [sortedObjTask, setObjTask] = useState({})
    useEffect(() => {
        setObjTask(sortTasksByStatus(data))
    },[data])
    useEffect(() => {console.log('Main-', data); console.log('MainS-', sortedObjTask); console.log('Date-',isDate)},[data,sortedObjTask,isDate])
    const groupByStatus = () => {
        switch(selectIdNav){
            case 0:
                return sortedObjTask.Pending || []
            case 1:
                return sortedObjTask.Running || []
            case 2:
                return sortedObjTask.Done || []
        }
            
    }
    const filterTasksByDayAndMonth = (tasks, dayNumber, monthNumber = (new Date().getMonth() + 1)) => {
        return tasks.filter(task => {
            const taskDate = new Date(task.data.date);
            return taskDate.getDate() === dayNumber && 
                taskDate.getMonth() === monthNumber - 1; 
        });
    };
    return(
        <div className= {styles.main}>
            <Header setDate={setDate}/>
            <AsideTime data={filterTasksByDayAndMonth(groupByStatus(),isDate)}/>
        </div>
    );
};

export default Main