// import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import testTb from '@image/testTb.jpg';
import editTask from '@image/editTask.svg';
import deleticon from '@image/deleticon.svg'
const Table = () => {
    const headerList = ["Check Box", "Task Name", "Start Date", "End Date", "Member", "Status", "Actions"]
    const testKist = [{title:'Ui Design', image:testTb, startTime:'03/12/2021',endTime:'5/12/2021',member:5,status:'Pending'},{title:'Ui Design', image:testTb, startTime:'03/12/2021',endTime:'5/12/2021',member:5,status:'Pending'}]
    return(
        <table className= {styles.table}>
            <thead>
                <tr>
                    {headerList.map((item, index) => (
                        <th key={index}><span>{item}</span></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {testKist.map((item,index)=>(
                    <tr key = {index}>
                        <td><input type='checkbox'/></td>
                        <td><div><img src = {item.image}/><p>{item.title}</p></div></td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td>{`${item.member} Member`}</td>
                        <td><div>{item.status}</div></td>
                        <td><div><img src = {editTask}/><img src = {deleticon}/></div></td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
};

export default Table