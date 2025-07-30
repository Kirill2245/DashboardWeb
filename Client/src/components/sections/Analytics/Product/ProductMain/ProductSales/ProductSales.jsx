
import PieChart from './Chart/PieChart';
import styles from './styles.module.css'
import image from '@image/dot.svg';
const ProductSales = () => {

    return(
        <section className = {styles.section}>
            <div className= {styles.header}>
                <h3>Product Sales Analytics</h3>
                <img src = {image}></img>
            </div>
            <PieChart values={[30, 50, 20]} />
            <div className={styles.containLabel}>
                <svg width="14px" height="14px">
                    <circle r = "7" cx = "7" cy = "7" fill='#5B93FF'/>
                </svg>
                <p>Total Sales</p>
                <svg width="14px" height="14px">
                    <circle r = "7" cx = "7" cy = "7" fill='#FFD66B'/>
                </svg>
                <p>Total Order</p>
                <svg width="14px" height="14px">
                    <circle r = "7" cx = "7" cy = "7" fill='#FF8F6B'/>
                </svg>
                <p>Order Cancel</p>
            </div>
        </section>
    );
};
export default ProductSales