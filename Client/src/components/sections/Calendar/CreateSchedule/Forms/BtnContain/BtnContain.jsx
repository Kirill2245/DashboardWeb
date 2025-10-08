// import { useState } from 'react';
import styles from './styles.module.css';
import ButtonLogo from '@common/ButtonLogo/ButtonLogo'
import user3 from '@image/user3.svg';
import location from '@image/location.svg';
const BtnContain = ({IsMapOpen, IsAddPeopleOpen}) => {
    return(
        <div className={styles.contain}>
            <ButtonLogo text = "Add People" image = {user3} styles = "addPeople" onClick = {IsAddPeopleOpen} type = "button"/>
            <ButtonLogo text = "Add location" image = {location} styles = "addLocation" onClick = {IsMapOpen} type = "button"/>
        </div>
    );

};

export default BtnContain