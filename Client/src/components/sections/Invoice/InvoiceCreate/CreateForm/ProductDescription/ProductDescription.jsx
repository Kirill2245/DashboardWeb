
import styles from './styles.module.css';
import Table from './Table/Table';
import image from '@image/addinvoice.svg'
const  ProductDescription= () => {
    return(
        <div className= {styles.contain}>
            <header>
                <h3>Product Description</h3>
                <img src = {image}/>
            </header>
            <Table/>
        </div>
    );
};

export default ProductDescription