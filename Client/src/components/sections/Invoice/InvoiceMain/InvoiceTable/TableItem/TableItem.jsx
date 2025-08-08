import styles from './styles.module.css';
import testImg from '@image/2.jpg'
import calendar from '@image/CalendarA.svg';
import message from '@image/Message.svg';
import Button from '@common/Button/Button';
import { useState } from 'react';

const TableItem = ({ isActive, onClick }) => {
    const [elect, isElect] = useState(false)
    const pointColor = isActive ? "#605BFF" : "#B3B3BF";
    const electColor = elect ? "#FFD66B" : "#B3B3BF"
    const shadowStyle = {
        boxShadow: isActive
            ? "0 0 2px 6px rgba(97, 91, 255, 0.03)"
            : "",
        position: "relative",
        zIndex: isActive ? 1001 : 1,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: "#ffffff"
    };
    const electClick = () => {
        isElect(prev => !prev)
    }
    return(
        <div className= {styles.item} onClick={onClick} style={shadowStyle}>
            <input type='checkbox'/>
            <p>#876364</p>
            <div className = {styles.contain}>
                <img src = {testImg}/>
                <p>Arrora gaur</p>
            </div>
            <span><img src = {message}/>arroragaur@gmail.com</span>
            <span><img src = {calendar}/>12 Dec, 2020</span>
            <Button text = "Complete" styles = "condition"/>
            <div className = {styles.containSvg}>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={electClick}>
                    <path d="M14.3532 9.95302C14.1351 10.1644 14.0349 10.47 14.0846 
                        10.7698L14.8332 14.9127C14.8963 15.2638 14.7481 15.6192 14.4543 
                        15.8221C14.1663 16.0326 13.7831 16.0579 13.4691 15.8895L9.73962 13.9443C9.60994 
                        13.8753 9.46595 13.8382 9.31859 13.834H9.0904C9.01125 13.8458 8.93378 13.8711 8.86305 
                        13.9098L5.13277 15.8642C4.94836 15.9568 4.73953 15.9897 4.53491 15.9568C4.03642 15.8625 
                        3.70381 15.3876 3.78549 14.8866L4.53491 10.7437C4.58459 10.4414 4.48439 10.1341 4.2663 
                        9.91934L1.22566 6.97217C0.971361 6.72545 0.882946 6.35494 0.999149 6.02065C1.11198 5.6872 
                        1.39996 5.44385 1.74773 5.38911L5.93271 4.782C6.25101 4.74916 6.53057 4.55549 6.67372 
                        4.26919L8.51781 0.488388C8.56159 0.404184 8.61801 0.326715 8.68622 0.261035L8.762 0.202092C8.80158 
                        0.158305 8.84705 0.122097 8.89757 0.0926254L8.98935 0.0589434L9.1325 0H9.487C9.80361 0.0328399 10.0823 
                        0.222301 10.228 0.505229L12.0965 4.26919C12.2312 4.54454 12.4931 4.73568 12.7954 4.782L16.9804 5.38911C17.3341 5.43964 
                        17.6296 5.68383 17.7467 6.02065C17.857 6.35831 17.7618 6.72881 17.5025 6.97217L14.3532 9.95302Z" fill = {electColor}/>
                </svg>
                <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z" fill={pointColor}/>
                    <path d="M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z" fill={pointColor}/>
                    <path d="M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z" fill={pointColor}/>
                </svg>
            </div>
        </div>
    );
};

export default TableItem