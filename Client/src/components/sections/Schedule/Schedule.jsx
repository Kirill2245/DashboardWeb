import ButtonLogo  from '@common/ButtonLogo/ButtonLogo';
import styles from './styles.module.css';
import Filter from '@image/Filter.svg'
import HeaderContain from './HeaderContain/HeaderContain';
import { useState } from 'react';
import List from './MainFrames/List/List';
import Board from './MainFrames/Board/Board';
import TimeLine from './MainFrames/TimeLine/TimeLine';
const Schedule = () => {
    const [FrameIndex, setIndex] = useState(0)
    const handleSetIndex = (index) => {
        setIndex(index)
    } 
    const isShowFrame = () => {
        switch (FrameIndex){
            case 0:return(<List/>)
            case 1:return(<Board/>)
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