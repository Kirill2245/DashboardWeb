import Button  from '@common/Button/Button.jsx';
import Menu from './Menu/Menu';
import Profile from './Profile/Profile';
import styles from './styles.module.css';
import logo from '@image/Logo.svg'

const Sidebar = ({isOut}) => {
    return(
        <section className= {styles.section}>
            <div className= {styles.contain}>
                <img src = {logo}></img>
                <h3>Base</h3>
            </div>
            <Menu/>
            <Button text = "Upgrade Now" styles = "update"/>
            <Profile name="test" fullname= "1" isOut={isOut}/>
        </section>
    )
};

export default Sidebar