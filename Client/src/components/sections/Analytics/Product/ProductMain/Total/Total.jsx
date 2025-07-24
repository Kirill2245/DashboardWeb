import styles from './styles.module.css';
import Chart from './Total/Chart.jsx';
const Total = ({date, flag = true , image}) => {
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
                                <p>5,00,874</p>
                            </aside>
                            <p className={styles.textCount}>+1400 New Added</p>
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
                                <p>4,00,874</p>
                            </aside>
                            <p className={styles.textCount}>+1400 New Added</p>
                        </div>
                        <Chart date={date} flag = {false}/>
                    </div>
                )
            }
        </>

    );
}

export default Total;