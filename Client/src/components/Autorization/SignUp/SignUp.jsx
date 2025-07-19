import image from '@image/test.png'
import styles from './styles.module.css'
import SignMain from './SignMain/SignMain'

const SignUp = ({ onSwitchToLogin }) => {

    return(
        <div className= {styles.signUp}>
            <SignMain onSwitchToLogin={onSwitchToLogin}/>
            <img src = {image} className = {styles.mainImage}>
            </img>
        </div>
    )
}
export default SignUp