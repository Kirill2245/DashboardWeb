import ButtonLogo from '@common/ButtonLogo/ButtonLogo.jsx';
import styles from './styles.module.css';
import Button  from '@common/Button/Button.jsx';
import image from '@image/Plus.svg';
import { useState } from 'react';
const BoxButton = ({isOverlay, isVisible, isShowCustomer}) => {
    const [btnActive, isActive] = useState(true)
            const btnClick = () => {
                isOverlay(true);
                isVisible();
            };
    return(

        <div className= {styles.contain}>
            {
                !btnActive ? (
                    <div>
                        <Button text = "Product" styles = "product" onClick = {() =>{isActive(true)}}/>
                        <Button text = "Customer" styles = "customerActive" onClick = {isShowCustomer}/>
                    </div>
                ): (
                    <div>
                        <Button text = "Product" styles = "productActive"/>
                        <Button text = "Customer" styles = "customer" onClick = {isShowCustomer}/>
                    </div>
                )
            }

            <ButtonLogo text = "Add Product" image = {image} styles = "addProduct" onClick = {btnClick}/>
        </div>
    );
};

export default BoxButton