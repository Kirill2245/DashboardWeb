
import styles from './styles.module.css';
import test from '@image/2.jpg';
import AddUser from '@image/AddUser.svg';
import Menu from '@image/Menu.svg';
const CardTask = ({title,countMember = 0, tag}) => {   
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 51) + 5;
    }; 
    const IndexZ = 1000
    return(
        <div className= {styles.card} style={{left:`${getRandomNumber()}%`}}>
            <div className={styles.contain}><input type='checkbox'/><h4>{title}</h4></div>
            <div className={styles.box}>
                {countMember > 0 && 
                    <figure style={{width:28 + (15 * countMember)}}>
                        {Array.from({ length: countMember }).map((_, index) => (
                            <img src = {test} key={index} style={{zIndex:IndexZ + index, left:15 * index}}/>
                        ))}
                        <img src = {AddUser} style={{zIndex:1111 + countMember, top:0, left:15*countMember}}/>
                    </figure>
                }
                {tag && <div className={styles.tag}>{tag}</div>}
                <img src = {Menu}/>
            </div>
        </div>
    );
};

export default CardTask