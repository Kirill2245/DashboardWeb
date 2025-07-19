import image from '@image/test.png'
import logo from '@image/Logo.svg'
import ButtonLogo from '@common/ButtonLogo/ButtonLogo'
import logoGoogle from '@image/logoGoogle.svg'
import logoFacebook from '@image/logoFacebook.svg'
import styles from './styles.module.css'
import SignForm from './SIgnForm/SIgnForm'

const SignUp = ({ onSwitchToLogin }) => {

    return(
        <div className= {styles.signUp}>
            <div className = {styles.form}>
                <img src = {logo} className = {styles.logo}></img>
                <h3>Sign Up</h3>
                <div className= {styles.btnContain}>
                    <ButtonLogo text = "Google" image = {logoGoogle} styles = "googleButton"></ButtonLogo>
                    <ButtonLogo text ="Facebook" image = {logoFacebook} styles = "facebookButton"></ButtonLogo>
                </div>
                <div className= {styles.contain}>
                    <div className = {styles.line}></div>
                    <p>Or</p>
                    <div className = {styles.line}></div>
                </div>
                <SignForm/>
                <aside className = {styles.textLogin}><p>Already have an account?</p><span onClick={onSwitchToLogin}>Log in</span></aside>
            </div>
            <img src = {image} className = {styles.mainImage}>
            </img>
        </div>
    )
}
export default SignUp