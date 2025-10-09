
import Chart from './Chart/Chart';
import styles from './styles.module.css';
import menu from '@image/Menu.svg'

const Reports = ({salesData}) => {
    return(
        <div className={styles.boxChart}>
            <header>
                <h4>Reports</h4>
                <img src = {menu}/>
            </header>
            <Chart salesData = {salesData}/>
        </div>
    );
};

export default Reports