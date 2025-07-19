import styles from './styles.module.css'
import image from '@image/Illustration.png'
import LogMain from './LogMain/LogMain'
import { useState } from 'react'
import Recover from './Recover/Recover'
const Login = ({onSwitchToLogin}) => {
    const [showRecover, isRecover] = useState(false)
    return(
        <>
            {!showRecover ?
                (<div className= {styles.login}>
                    <LogMain onSwitchToLogin={onSwitchToLogin} isRecover={() => isRecover(true)}/>
                    <img src = {image} alt= "" className = {styles.mainImage}/>
                </div>):
                (<Recover/>)
            }
        </>
    )
}
export default Login