import styles from './styles.module.css'
import Button from '@common/Button/Button'
import hide from '@image/Hide.svg'
import visible from '@image/visible.png'
import { useState, useEffect } from 'react'
import { validateEmail } from '@lib/validatators.js';
import { fetch_signUp } from '@api/user_requests'
const SignForm = ({isSign}) => {
    const [Password, setPassword] = useState('');
    const [VisiblePassword, swapVisible] = useState(false);
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [FullName, setFullName] = useState('');
    const [data, setData] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const onclickVisible = () => {
        swapVisible(!VisiblePassword)
    }
    const req_signup = async(e) => {
        e.preventDefault();
        if (!validateEmail(Email)){
            console.log("email error");
            return;
        }
        if (!isChecked) {
            console.log("Чекбокс не отмечен — код дальше не выполняется");
            return; 
        }
        try{
            const data = {
                name:Name,
                fullName:FullName,
                email:Email,
                password:Password
            }
            const response = await fetch_signUp(data);
            setData(response)
        }
        catch (err) {
            console.error("Ошибка при регистрации:", err);
        }
    }
    useEffect(() => {
        if (data?.message === 'User created successfully') {
            console.log('Успешная регистрация', data);
            isSign();
        }
    }, [data, isSign]);
    return(
        <form className = {styles.form} onSubmit={req_signup}>
            <label className= {styles.input}>
                Full Name
                <input placeholder='Jiangyu' type='text' onChange={(e) => setFullName(e.target.value)}></input>
            </label>
            <label className= {styles.input}>
                Email Address
                <input 
                    placeholder='example@gmail.com' 
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="current-password"
                ></input>
            </label>
            <label className= {styles.input}>
                Username
                <input placeholder='johnkevine4362' type='text' onChange={(e) => setName(e.target.value)}></input>
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
            <div className= {styles.contain}>
                <input 
                    type="checkbox" 
                    id="subscribe" 
                    className = {styles.checkbox}
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                ></input>
                <label className = {styles.checkboxInput} htmlFor="subscribe">By creating an account you agree to the <span>terms of use</span> and our <span>privacy policy.</span></label>
            </div>
            <Button text = "Create account" styles = "create" onClick={req_signup}/>
        </form>
    )
}
export default SignForm