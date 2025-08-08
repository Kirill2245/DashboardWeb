import styles from './styles.module.css';
import Chart from './Chart/Chart.jsx';
import ChartSales from './ChartSales/ChartSales.jsx';
import {formatIndianNumber} from '@lib/formatNumber.js';
const Total = ({date, flag = true , image, count = 0, total = 0}) => {
    return(
        <>
            {
                flag ? 
                (
                    <div className = {styles.section}>
                        <div>
                            <img src = {image}/>
                            <aside className= {styles.textContain}>
                                <p>Total Product</p>
                                <p>{formatIndianNumber(total)}</p>
                            </aside>
                            <p className={styles.textCount}>+{count} New Added</p>
                        </div>
                        <Chart date={date}/>
                    </div>
                ):
                (
                    <div className = {styles.section}>
                        <div>
                            <img src = {image}/>
                            <aside className= {styles.textContain}>
                                <p>Total Sales</p>
                                <p>{formatIndianNumber(total)}</p>
                            </aside>
                            <p className={styles.textCount}>+{count} New Added</p>
                        </div>
                        <ChartSales date={date}/>
                    </div>
                )
            }
        </>

    );
}

export default Total;