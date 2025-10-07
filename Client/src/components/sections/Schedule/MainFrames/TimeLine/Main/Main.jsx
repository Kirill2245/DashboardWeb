// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Header from './Header/Header';
import AsideTime from './AsideTime/AsideTime';
const Main = ({selectIdNav}) => {
    const [isDate,setDate] = useState(null)
    useEffect(() => {console.log(selectIdNav, isDate)},[selectIdNav, isDate])
        const tasks = [
        {
            title: 'Team Meeting',
            tag: 'High',
            countMember: 5,
            date: "2025-10-08T00:00:00.000Z",
            startTime: "09:00",
            endTime: "10:30"
        },
        {
            title: 'Team Meeting',
            tag: 'High',
            countMember: 5,
            date: "2025-10-08T00:00:00.000Z",
            startTime: "19:00",
            endTime: "10:30"
        },
        {
            title: 'Team Meeting',
            tag: 'High',
            countMember: 5,
            date: "2025-10-08T00:00:00.000Z",
            startTime: "10:00",
            endTime: "10:30"
        },
        {
            title: 'Team Meeting',
            tag: 'High',
            countMember: 5,
            date: "2025-10-08T00:00:00.000Z",
            startTime: "00:00",
            endTime: "10:30"
        },
        {
            title: 'Project Presentation',
            tag: 'Medium',
            countMember: 8,
            date: "2025-10-09T00:00:00.000Z",
            startTime: "14:00",
            endTime: "15:30"
        },
        {
            title: 'Code Review',
            tag: 'Low',
            countMember: 3,
            date: "2025-10-10T00:00:00.000Z",
            startTime: "11:00",
            endTime: "12:00"
        },
        {
            title: 'Client Call',
            tag: 'High',
            countMember: 2,
            date: "2025-10-11T00:00:00.000Z",
            startTime: "16:00",
            endTime: "17:00"
        }
    ];
    const filterTasksByDayAndMonth = (tasks, dayNumber, monthNumber = (new Date().getMonth() + 1)) => {
        return tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.getDate() === dayNumber && 
                taskDate.getMonth() === monthNumber - 1; 
        });
    };
    return(
        <div className= {styles.main}>
            <Header setDate={setDate}/>
            <AsideTime data={filterTasksByDayAndMonth(tasks,isDate)}/>
        </div>
    );
};

export default Main