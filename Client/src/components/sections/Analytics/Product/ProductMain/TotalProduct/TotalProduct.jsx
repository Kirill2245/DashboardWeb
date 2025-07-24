import styles from './styles.module.css';
import TotalChart from './TotalChart/TotalChart.jsx';
import icon from '@image/icon-grup.svg'
const TotalProduct = ({date}) => {
    return(
        <div className = {styles.section}>
            <div>
                <img src = {icon}/>
                <aside className= {styles.textContain}>
                    <p>Total Product</p>
                    <p>5,00,874</p>
                </aside>
                <p className={styles.textCount}>+1400 New Added</p>
            </div>
            <TotalChart date={date}/>
        </div>
    );
}

export default TotalProduct;