import styles from './styles.module.css'
import logo from '@image/Logo.svg'
import ButtonLogo from '@common/ButtonLogo/ButtonLogo'
import logoGoogle from '@image/logoGoogle.svg'
import logoFacebook from '@image/logoFacebook.svg'
import LogForm from './LogForm/LogForm'
const LogMain = ({onSwitchToLogin , isRecover, isLogin}) => {
    return(
        <section className= {styles.form}>
            <img src = {logo} className = {styles.logo}></img>
            <h3>Log in</h3>
            <div className= {styles.btnContain}>
                <ButtonLogo text = "Google" image = {logoGoogle} styles = "googleButton"></ButtonLogo>
                <ButtonLogo text ="Facebook" image = {logoFacebook} styles = "facebookButton"></ButtonLogo>
            </div>
            <div className= {styles.contain}>
                <div className = {styles.line}></div>
                <p>Or</p>
                <div className = {styles.line}></div>
            </div>
            <LogForm isRecover={isRecover} isLogin={isLogin}/>
            <aside className = {styles.textLogin}><p>Don’t have account yet?  </p><span onClick={onSwitchToLogin}>New Account</span></aside>
        </section>
    )
};

export default LogMain