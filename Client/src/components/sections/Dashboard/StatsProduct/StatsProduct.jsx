
import styles from './styles.module.css';
import menu from '@image/Menu.svg'
import Table from './Table/Table';
const StatsProduct = () => {
    return(
        <div className= {styles.contain}>
            <div>
                <header>
                    <h4>Recent Orders</h4>
                    <img src = {menu}/>
                </header>
                <Table/>
            </div>
            <div>
                <header>
                    <h4>Top Selling Products</h4>
                    <img src = {menu}/>
                </header>
            </div>
        </div>
    );
};

export default StatsProduct