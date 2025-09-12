import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import styles from './styles.module.css';
import {fetch_user} from '@api/user_requests.js';
import Dashboard from '../sections/Dashboard/Dashboard';
import Analytics from '../sections/Analytics/Analytics';
import Calendar from '../sections/Calendar/Calendar';
import Invoice from '../sections/Invoice/Invoice';
import Messages from '../sections/Messages/Messages';
import Schedule from '../sections/Schedule/Schedule';
import Settings from '../sections/Settings/Settings';

const Main = ({isOut}) => {
    const [userId, setId] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [button, setButton ]= useState(0)
    const [overlay, isOverlay] = useState(false)
    const handleButtonClick = (buttonName) => {
        setButton(buttonName)
    };
    useEffect(() => {
        const loadUserData = async () => {
        const savedId = localStorage.getItem('rememberedId');
        if (!savedId) {
            setIsLoading(false);
            return;
        }
            setId(savedId);
        };
        loadUserData();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await fetch_user( userId );
            if (response?.success) {
                console.log(response.user)
                setData(response.user); 
            } else {
                console.error('Пользователь не найден');
            }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
}, [userId]); 
    if (isLoading){return(<div>Загрузка</div>)}
    return(
        <main className= {styles.main}>
            {overlay && <div className= {styles.overlay}></div>}
            <Sidebar isOut={isOut} user = {data} isButton={handleButtonClick}/>
            {button == 0 && <Dashboard idUser = {userId}/>}
            {button == 1 && <Analytics isOverlay={(i) => isOverlay(i)} idUser={userId}/>}
            {button == 2 && <Invoice idUser={userId}/>}
            {button == 3 && <Schedule/>}
            {button == 4 && <Calendar/>}
            {button == 5 && <Messages userId={userId}/>}
            {button == 7 && <Settings/>}
        </main>
    );
}

export default Main