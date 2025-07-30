import LineChart from './Chart/Chart';
import styles from './styles.module.css'

const ProductAdd = () => {
    const chartData = [
        { date: "2023-01", value: 30442 },
        { date: "2023-02", value: 50442 },
        { date: "2023-03", value: 80442 },
        { date: "2023-04", value: 40442 },
        { date: "2023-05", value: 60442 },
        { date: "2023-06", value: 70442 },
        { date: "2023-07", value: 67112 }
    ];
    return(
        <section className = {styles.section}>
            <h3>Product Add  by Month</h3>
            <LineChart data={chartData}/>
        </section>
    );
};
export default ProductAdd