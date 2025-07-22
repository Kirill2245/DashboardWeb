import styles from './styles.module.css'
import Button from '@common/Button/Button'
import hide from '@image/Hide.svg'
import visible from '@image/visible.png'
import { useEffect, useState } from 'react';
import { validateEmail } from '@lib/validatators.js';
import { fetch_login } from '@api/user_requests.js';
const LogForm = ({isRecover, isLogin}) => {
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('')
    const [VisiblePassword, swapVisible] = useState(false);
    const [data, setData] = useState(null);
    const onclickVisible = () => {
        swapVisible(!VisiblePassword)
    }
    const req_login = async (e) => {  
        e.preventDefault(); 
        if (!validateEmail(Email)) {
            console.log("email error");
            return;
        }
        
        try {
            const data = {
                email: Email,
                password: Password
            };
            console.log(data)
            const response = await fetch_login(data);  
            setData(response);
        } 
        catch (err) {
            console.error("Ошибка при входе:", err);
        }
    };


    useEffect(() => {
        if (data?.message === 'Login successful') {
            console.log('Успешный вход:', data);
            isLogin(); 
        }
    }, [data,isLogin]);
    return(
            <form onSubmit={req_login}>
                <label className= {styles.input}>
                    Email Address
                    <input 
                        placeholder='example@gmail.com' 
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="current-password"
                    ></input>
                </label>
                <label className= {styles.input} >
                    Password
                    <div className={styles.inputWrapper}>
                        <input  
                        type={VisiblePassword? 'text' : 'password'}
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.password}
                        />
                        <button type="button" className={styles.toggle} onClick={onclickVisible}>
                            {!VisiblePassword ? <img src={hide} alt="Показать пароль" className={styles.icon}/> : 
                            <img src={visible} alt="Скрыть пароль" className={styles.icon}/>
                            }
                        </button>
                    </div>
                </label>
                <div className = {styles.contain}>
                    <label>
                        <input type='checkbox'/>
                        Remember me
                    </label>
                    <span onClick={isRecover}>Reset Password?</span>
                </div>
                <Button text = "Log in" styles = "create" onClick = {req_login}/>
            </form>
    );
};

export default LogForm