import styles from './styles.module.css';
// import image from '@image/ProfileTest.svg'
import image from '@image/2.jpg'
import logout from '@image/Logout.svg';
const Profile = ({name, fullname, isOut , isCollapsed = false}) => {
    return(
        <>
            {
                !isCollapsed ? 
                (
                <div className={styles.contain}>
                    <div className= {styles.containImage} style={{ backgroundImage: `url(${image})`}}></div>
                    <aside className = {styles.text}>
                        <p>{`${name} ${fullname}`}</p>
                        <p>Free Account</p>
                    </aside>
                    <img src = {logout} className= {styles.logo} onClick={isOut}/>
                </div>
                ):
                (
                <div className={styles.collapsedContain}>
                    <div style={{ backgroundImage: `url(${image})`}}></div>
                    <img src = {logout} onClick={isOut}/>
                </div>
                )
            }
        </>

    )
};

export default Profile