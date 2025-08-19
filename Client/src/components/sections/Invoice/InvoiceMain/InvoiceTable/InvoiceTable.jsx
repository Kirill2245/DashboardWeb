import styles from './styles.module.css';
import arrow from '@image/Arrow.svg';
import deleteImg from '@image/Delete.svg';
import TableItem from './TableItem/TableItem';
import { useState } from 'react';
const InvoiseTable = () => {
      const [activeId, setActiveId] = useState(null); // Храним ID активного элемента

    const handleItemClick = (id) => {
        setActiveId(activeId === id ? null : id); // Переключаем активность
    };
    return(
        <section className= {styles.section}>
            <header>
                <input type='checkbox'/>
                <span>Invoice Id<img src = {arrow}/></span>
                <span>Name<img src = {arrow}/></span>
                <span>Email<img src = {arrow}/></span>
                <span>Date<img src = {arrow}/></span>
                <span>Status<img src = {arrow}/></span>
                <img src = {deleteImg} className={styles.img}/>
            </header>
            <div className= {styles.contain}>
                <TableItem
                    id = {0}
                    isActive = {activeId === 0}
                    onClick = {() => handleItemClick(0)}
                />
            </div>
        </section>
    );
};

export default InvoiseTable