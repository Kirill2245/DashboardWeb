import image from '@image/test.png'
import styles from './styles.module.css'
import SignMain from './SignMain/SignMain'

const SignUp = ({ onSwitchToLogin, isSign }) => {

    return(
        <div className= {styles.signUp}>
            <SignMain onSwitchToLogin={onSwitchToLogin} isSign={isSign}/>
            <img src = {image} className = {styles.mainImage}>
            </img>
        </div>
    )
}
export default SignUp