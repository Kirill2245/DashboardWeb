import styles from './styles.module.css';
import imagePosition from '@image/Position.svg';
import {formatIndianNumber} from '@lib/formatNumber.js'
const TableElement = ({position, name, image, price, order, sales}) => {
    const getColor = () => {
        if (position % 2 === 0) return "#FAFAFB";
        else return "white";
    };
    return(
        <div className = {styles.element} style={{backgroundColor:getColor()}}>
            {(position + 1) <= 3 ? 
                (<img src = {imagePosition} className = {styles.imagePosition}/>) : 
                (<p className = {styles.position}>{position + 1}</p>)
            }
            <div className = {styles.nameContain}>
                <img src = {image} className = {styles.image}></img>
                <p style={{margin: "0 0 0 10px"}}>{name}</p>
            </div>
            <div className = {styles.priceContain}>
                <p>{`$${formatIndianNumber(price)}`}</p>
            </div>
            <div className = {styles.orderContain}>
                <p>{`${formatIndianNumber(order)} Piece`}</p>
            </div>
            <p style={{margin: "0 20px 0 0" , color:"#2B9943"}}>{`$${formatIndianNumber(sales)}`}</p>
        </div>
    );
};
export default TableElement