
import styles from './styles.module.css';
import menu from '@image/Menu.svg'
const MainChart = () => {
    return(
        <div className= {styles.contain}>
            <div>
                <header>
                    <h4>Reports</h4>
                    <img src = {menu}/>
                </header>
            </div>
            <div>
                <header>
                    <h4>Analytics</h4>
                    <img src = {menu}/>
                </header>                
            </div>
        </div>
    );
};

export default MainChart