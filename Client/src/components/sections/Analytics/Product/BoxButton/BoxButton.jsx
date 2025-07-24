import ButtonLogo from '@common/ButtonLogo/ButtonLogo.jsx';
import styles from './styles.module.css';
import Button  from '@common/Button/Button.jsx';
import image from '@image/Plus.svg';
import { useState } from 'react';
const BoxButton = () => {
    const [btnActive, isActive] = useState(true)
    return(
        <div className= {styles.contain}>
            {
                !btnActive ? (
                    <div>
                        <Button text = "Product" styles = "product" onClick = {() =>{isActive(true)}}/>
                        <Button text = "Customer" styles = "customerActive"/>
                    </div>
                ): (
                    <div>
                        <Button text = "Product" styles = "productActive"/>
                        <Button text = "Customer" styles = "customer" onClick = {() =>{isActive(false)}}/>
                    </div>
                )
            }

            <ButtonLogo text = "Add Product" image = {image} styles = "addProduct"/>
        </div>
    );
};

export default BoxButton