
import styles from './styles.module.css';
import testimg from '@image/testp.png'
const Table = () => {
    return(
        <table className= {styles.table}>
            <thead className={styles.headerRow}>
                <tr>
                    <th>Tracking no</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Total Order</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody className={styles.bodyRow}>
                <tr>
                    <td>#876364</td>
                    <td><div><img src={testimg}/><span>Camera Lens</span></div></td>
                    <td>$178</td>
                    <td><div>325</div></td>
                    <td>$1,46,660</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table