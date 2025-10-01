import ButtonLogo  from '@common/ButtonLogo/ButtonLogo';
import styles from './styles.module.css';
import Filter from '@image/Filter.svg'
import HeaderContain from './HeaderContain/HeaderContain';
import { useState, useEffect } from 'react';
import List from './MainFrames/List/List';
import Board from './MainFrames/Board/Board';
import TimeLine from './MainFrames/TimeLine/TimeLine';
import { fetch_schedule } from '@api/user_requests';
const Schedule = ({userId}) => {
    const [FrameIndex, setIndex] = useState(0)
    const handleSetIndex = (index) => {
        setIndex(index)
    } 
    const [scheduleListTask, setScheduleList] = useState([])
    useEffect(() => {
        const fetch = async() => {
            try{
                const result = await fetch_schedule(userId);
                if (result && result.success !== false){
                    const filterArray = result.result.filter(item => item.itemType === 'Task')
                    setScheduleList(filterArray)
                }
            }
            catch(err){
                console.error('Error get data',err)
                alert(err)
            }
        }
        fetch()
    },[userId])
    const isShowFrame = () => {
        switch (FrameIndex){
            case 0:return(<List data={scheduleListTask}/>)
            case 1:return(<Board data={scheduleListTask}/>)
            case 2:return(<TimeLine/>)
        }
    }
    return(
        <section className= {styles.section}>
            <header className= {styles.header}>
                <div className={styles.contain}><h1>Task Preview</h1><ButtonLogo text = 'Filter' styles = 'filter' image = {Filter}/></div>
                <HeaderContain setIndex={handleSetIndex}/>
            </header>
            {isShowFrame()}
        </section>
    );
};

export default Schedule