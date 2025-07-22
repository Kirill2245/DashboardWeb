
import styles from './styles.module.css';
import imageActive from '@image/Rectangle.svg';
const ButtonMenu = ({image, text , active, flag, onClick }) => {

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
                    </div>
                ):
                (
                    <div className={styles.containNoActive} onClick={onClick}>
                        <img src = {image}></img>
                        <p>{text}</p>
                        {flag ? (<div></div>):(<div></div>)}
                    </div>
                )
            }
        </>
    );
};

export default ButtonMenu;
