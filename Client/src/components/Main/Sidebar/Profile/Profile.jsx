import styles from './styles.module.css';
// import image from '@image/ProfileTest.svg'
import image from '@image/2.jpg'
import logout from '@image/Logout.svg';
const Profile = ({name, fullname, isOut}) => {
    return(
        <div className={styles.contain}>
            <div className= {styles.containImage} style={{ backgroundImage: `url(${image})`}}></div>
            <aside className = {styles.text}>
                <p>{`${name} ${fullname}`}</p>
                <p>Free Account</p>
            </aside>
            <img src = {logout} className= {styles.logo} onClick={isOut}/>
        </div>
    )
};

export default Profile