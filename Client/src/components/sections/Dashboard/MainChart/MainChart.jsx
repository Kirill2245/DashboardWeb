
import styles from './styles.module.css';
import menu from '@image/Menu.svg'
import ProductSales from '@common/ProductSales/ProductSales'
const MainChart = ({idUser}) => {
    return(
        <div className= {styles.contain}>
            <div className={styles.boxChart}>
                <header>
                    <h4>Reports</h4>
                    <img src = {menu}/>
                </header>
            </div>
            <ProductSales idUser = {idUser} title = "Analytics" flagSection = {false}  widthChart = {216} heightChart = {216}/>
        </div>
    );
};

export default MainChart