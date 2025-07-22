
import styles from './styles.module.css';
import imageActive from '@image/Rectangle.svg';
const ButtonMenu = ({image, text , active, flag, onClick, count = 12 }) => {

    return(
        <>
            {active ? 
                (
                    <div className={styles.containActive} onClick={onClick}>
                        <div className={styles.container}>
                            <img src={imageActive} />
                            <img src={image} className={styles.logo} />
                        </div>
                        <p>{text}</p>
                        {(flag && count != 0 ) &&(<div className = {styles.message}><p>{count}</p></div>)}
                    </div>
                ):
                (
                    <div className={styles.containNoActive} onClick={onClick}>
                        <img src = {image}></img>
                        <p>{text}</p>
                        {(flag && count != 0) && (<div className = {styles.message}><p>{count}</p></div>)}
                    </div>
                )
            }
        </>
    );
};

export default ButtonMenu;
