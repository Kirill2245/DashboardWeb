import styles from './styles.module.css';
import imageActive from '@image/Rectangle.svg';
const ImageMenu = ({active, onClick, image}) => {
    return(
        <>
            {active ?(
                <div className= {styles.imgContainActive}>
                    <img src={imageActive}/>
                    <img src = {image} onClick={onClick} className= {styles.logo}/>
                </div>):(
                <div className= {styles.imgContain}>
                    <img src = {image} onClick={onClick}/>
                </div>
            )
        }
        </>
    );
};

export default ImageMenu