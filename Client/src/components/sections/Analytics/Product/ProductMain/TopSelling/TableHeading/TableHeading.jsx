import styles from './styles.module.css';
import arrow from '@image/Arrow.svg';
const TableHeading = ({text}) => {
    const getMargin = () => {
        switch (text) {
            case "SN": return "0 51px 0 0";
            case "Name": return "0 182px 0 0";
            case "Price" : return "0 76px 0 0";
            case "Total Order" : return "0 67px 0 0";
        }
    };
    return(
        <div className= {styles.contain} style={{margin: getMargin()}}>
            <p>{text}</p>
            <img src = {arrow}/>
        </div>
    );
};

export default TableHeading