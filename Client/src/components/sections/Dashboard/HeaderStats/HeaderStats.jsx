
import styles from './styles.module.css';
import IconSave from '@image/IconSave.svg';
import Stock from '@image/Stock.svg';
import IconSales from '@image/IconSales.svg';
import iconJob from '@image/iconJob.svg';
const HeaderStats = ({list}) => {
    const data = [
        {
            count:list.save,
            img:IconSave,
            text:"Save Product"
        },
        {
            count:20,
            img:Stock,
            text:"Stock Products"
        },
        {
            count:list.sales,
            img:IconSales,
            text:"Sales Products"
        },
        {
            count:12,
            img:iconJob,
            text:"Job Application"
        }
    ]
    return(
        <div className= {styles.contain}>
            {data.map((item, index) => {
                return(
                    <div key={index} className={styles.box}>
                        <img src={item.img}/>
                        <div>
                            <h4>{item.count}+</h4>
                            <p>{item.text}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default HeaderStats