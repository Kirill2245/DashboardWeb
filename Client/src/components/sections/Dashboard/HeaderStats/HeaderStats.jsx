
import styles from './styles.module.css';
import IconSave from '@image/IconSave.svg';
import Stock from '@image/Stock.svg';
import IconSales from '@image/IconSales.svg';
import iconJob from '@image/iconJob.svg';
const HeaderStats = () => {
    const data = [178, 20, 190, 12]
    const imgList = [IconSave, Stock, IconSales, iconJob]
    return(
        <div className= {styles.contain}>
            {data.map((item, index) => {
                return(
                    <div key={index} className={styles.box}>
                        <img src={imgList[index]}/>
                        <div>
                            <h4>{item}+</h4>
                            <p>Save Products</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default HeaderStats