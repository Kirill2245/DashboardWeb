import styles from './styles.module.css'
import Button from '@common/Button/Button'
import hide from '@image/Hide.svg'
import visible from '@image/visible.png'
import { useState } from 'react';
const LogForm = ({isRecover}) => {
    const [password, setPassword] = useState('');
    const [VisiblePassword, swapVisible] = useState(false);

    const onclickVisible = () => {
        swapVisible(!VisiblePassword)
    }

    return(
            <form>
                <label className= {styles.input}>
                    Email Address
                    <input placeholder='example@gmail.com' type='email'></input>
                </label>
                <label className= {styles.input} >
                    Password
                    <div className={styles.inputWrapper}>
                        <input  
                        type={VisiblePassword? 'text' : 'password'}
                        value={password}
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
                <Button text = "Log in" styles = "create"/>
            </form>
    );
};

export default LogForm