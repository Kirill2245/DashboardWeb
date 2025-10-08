import styles from './styles.module.css';
import object from '@image/object.svg';
import { useState } from 'react';
const Update = () => {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div className={styles.contain}>
            <div className={styles.imageBox}>
                <img src = {object}></img>
                <svg width="127" height="43" viewBox="0 0 127 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 43L13.4908 0H114.905L127 43H0Z" fill="url(#paint0_linear_4_254)"/>
                <defs>
                <linearGradient id="paint0_linear_4_254" x1="63.5" y1="0" x2="63.5" y2="43" gradientUnits="userSpaceOnUse">
                <stop stop-color={isHovered ? "yellow": "#7EAAFF"} stop-opacity="0.29"/>
                <stop offset="1" stop-color={isHovered ? "yellow": "#C4C4C4"} stop-opacity="0"/>
                </linearGradient>
                </defs>
                </svg>
            </div>
            <div className={styles.boxBtn}>
                <button 
                    className={styles.UpdateNow}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >Upgrade Now
                </button>
            </div>
        </div>
    )
};

export default Update