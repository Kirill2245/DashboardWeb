import Menu from './Menu/Menu';
import Profile from './Profile/Profile';
import styles from './styles.module.css';
import Update from './Update/Update';
import logo from '@image/Logo.svg'

const Sidebar = () => {
    return(
        <section className= {styles.section}>
            <div className= {styles.contain}>
                <img src = {logo}></img>
                <h3>Base</h3>
            </div>
            <Menu/>
            <Update/>
            <Profile/>
        </section>
    )
};

export default Sidebar