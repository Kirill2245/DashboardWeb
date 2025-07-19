import styles from './styles.module.css'
import Button from '@common/Button/Button'
import hide from '@image/Hide.svg'
import visible from '@image/visible.png'
import { useState } from 'react'
const SignForm = () => {
    const [password, setPassword] = useState('');
    const [VisiblePassword, swapVisible] = useState(false)
    const onclickVisible = () => {
        swapVisible(!VisiblePassword)
    }
    return(
        <form className = {styles.form}>
            <label className= {styles.input}>
                Full Name
                <input placeholder='Jiangyu' type='text'></input>
            </label>
            <label className= {styles.input}>
                Email Address
                <input placeholder='example@gmail.com' type='email'></input>
            </label>
            <label className= {styles.input}>
                Username
                <input placeholder='johnkevine4362' type='text'></input>
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
            <div className= {styles.contain}>
                <input type="checkbox" id="subscribe" className = {styles.checkbox}></input>
                <label className = {styles.checkboxInput} htmlFor="subscribe">By creating an account you agree to the <span>terms of use</span> and our <span>privacy policy.</span></label>
            </div>
            <Button text = "Create account" styles = "create"/>
        </form>
    )
}
export default SignForm