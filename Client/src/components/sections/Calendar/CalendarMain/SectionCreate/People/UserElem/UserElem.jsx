
import styles from './styles.module.css';
import test from '@image/2.jpg'
const UserElem = ({name, email}) => {

    return(
        <div className= {styles.elem}>   
            <img src = {test}/>
            <article>
                <h4>{name}</h4>
                <p>{email}</p>
            </article>
        </div>
    );
};

export default UserElem