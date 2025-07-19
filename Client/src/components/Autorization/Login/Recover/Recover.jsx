import Button from '@common/Button/Button';
import logo from '@image/Logo.svg';
import styles from './styles.module.css';
const Recover = () => {
    return(
        <section className= {styles.section} aria-labelledby="recover-heading">
            <div className= {styles.contain}>
                <img src = {logo} alt="Логотип" className= {styles.logo}/>
                <h3 id="recover-heading" >Recover</h3>
                <form className= {styles.form}>
                    <label>
                        Email Address
                        <input type="email" placeholder='example@gmail.com'/>
                    </label>
                    <Button text = "Reset Your Password" styles = "reset"/>
                </form>
            </div>
        </section>
    )
};

export default Recover