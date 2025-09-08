import CalendarButton from '@common/CalendarButton/CalendarButton';
import styles from './styles.module.css';
import HeaderStats from './HeaderStats/HeaderStats.jsx';
import MainChart from './MainChart/MainChart.jsx';
import StatsProduct from './StatsProduct/StatsProduct.jsx';
const Dashboard = () => {
    return(
        <section className= {styles.section}>
            <header className={styles.header}>
                <h3>Dashboard</h3>
                <div className={styles.contain}>
                    <CalendarButton text ="start-date"/>
                    <CalendarButton text ="end-date"/>
                </div>
            </header>
            <div className={styles.main}>
                <HeaderStats/>
                <MainChart/>
                <StatsProduct/>
            </div>
        </section>
    );
};

export default Dashboard