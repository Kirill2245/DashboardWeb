import  Button  from '../Button/Button.jsx';
import styles from './styles.module.css';
import image from '@image/conf.png';
const Confirim = ({isMain}) => {
    return(
        <div className= {styles.section}>
            <div className={styles.contain}>
                <img src= {image}></img>
                <h3>Your account successfully created.</h3>
                <Button styles="conf" text= "Go to Home" onClick={isMain}/>
            </div>
        </div>
    );
}

export default Confirim