// import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import testTb from '@image/testTb.jpg';
import editTask from '@image/editTask.svg';
import deleticon from '@image/deleticon.svg'
import {  useState } from 'react';
import { fetch_updateStatusTask } from '@api/task_request';
const Table = ({  data = [] }) => {
    const headerList = ["Check Box", "Task Name", "Start Date", "End Date", "Member", "Status", "Actions"]
    const status = ["Pending", "Running", "Review", "Done"]
    const [currentIndex, setCurrentIndex] = useState(0)
    const [editActive, setEditActive] = useState(null) 

    const stylesForStatus = (statusType) => {
        switch (statusType) {
            case 'Pending':
                return { backgroundColor: 'orange' };
            case 'Running':
                return { backgroundColor: '#605BFF' };
            case 'Done':
                return { backgroundColor: '#2B9943' };
            case 'Review':
                return {backgroundColor: '#FF6A77'}
            default:
                return {};
        }
    }
    const fetch_data = async(taskId, status) => {
        try{
            const result = await fetch_updateStatusTask({status:status}, taskId)
            if (result.success){
                alert(result.message)
            }
            else{
                alert(result.message)
            }
        }
        catch(error){
            console.error('Invalid update task status-',error)
            alert('Invalid update task status')
        }
    }
    const handleStatusClick = (itemIndex) => {
        if (editActive === itemIndex) {
            setCurrentIndex((prev) => (prev + 1) % status.length)
        } else {
            setEditActive(itemIndex)
            setCurrentIndex(0) 
        }
    }

    const handleSaveClick = (taskId, status) => {
        setEditActive(null) 
        fetch_data(taskId, status)
    }

    const handleEditClick = (itemIndex) => {
        setEditActive(itemIndex)
        setCurrentIndex(status.findIndex(s => s === data[itemIndex]?.data?.status) || 0)
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {headerList.map((item, index) => (
                        <th key={index}><span>{item}</span></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => (
                    <tr key={index}>
                        <td><input type='checkbox'/></td>
                        <td>
                            <div>
                                {item.data?.image ? (
                                    <img 
                                        src={`https://localhost:5000${item.data.image}`} 
                                        alt={item.data?.title || 'Task image'} 
                                    />
                                ) : (
                                    <img 
                                        src={testTb} 
                                        alt={item.data?.title || 'Task image'} 
                                    />
                                )}
                                <p>{item.data?.title || 'No Title'}</p>
                            </div>
                        </td>
                        <td>{item.data?.startTime || 'N/A'}</td>
                        <td>{item.data?.endTime || 'N/A'}</td>
                        <td>{`${item.data?.memberList?.length || 0} Member`}</td>
                        <td>
                            <div 
                                style = {stylesForStatus(editActive === index ? status[currentIndex] : item.data?.status)} 
                                onClick={() => handleStatusClick(index)}
                            >
                                {editActive === index ? status[currentIndex] : item.data?.status}
                            </div>
                        </td>
                        <td>
                            <div className={styles.actions}>
                                {editActive === index ? (
                                    <svg 
                                        width="28" 
                                        height="28" 
                                        viewBox="0 0 28 28" 
                                        fill="none" 
                                        onClick={() => handleSaveClick(item.data?._id, status[currentIndex])}
                                        className={styles.saveIcon}
                                    >
                                        <path 
                                            d="M20.5 24.5H7.5C6.94772 24.5 6.5 24.0523 6.5 23.5V8.5C6.5 7.94772 6.94772 7.5 7.5 7.5H17L21.5 12V23.5C21.5 24.0523 21.0523 24.5 20.5 24.5Z" 
                                            stroke="#605BFF" 
                                            strokeWidth="1.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        />
                                        <path 
                                            d="M19.5 24.5V15.5H8.5V24.5" 
                                            stroke="#605BFF" 
                                            strokeWidth="1.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        />
                                        <path 
                                            d="M8.5 7.5V12H16.5" 
                                            stroke="#605BFF" 
                                            strokeWidth="1.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        />
                                    </svg> 
                                ) : (
                                    <img 
                                        src={editTask} 
                                        onClick={() => handleEditClick(index)}
                                        alt="Edit task"
                                    />
                                )}
                                <img src={deleticon} alt="Delete task"/>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table