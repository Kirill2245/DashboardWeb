import { useState } from 'react';
import Product from './Product/Product';
import Customer from './Customer/Customer';
const Analytics = ({isOverlay, idUser}) => {
    const [showCustomer, isShowCustomer] = useState(false)
    return(
        <>
            {showCustomer ? <Customer/> : <Product isOverlay={isOverlay} idUser={idUser} isShowCustomer={() => isShowCustomer(true)}/>}
        </>
    );
};

export default Analytics