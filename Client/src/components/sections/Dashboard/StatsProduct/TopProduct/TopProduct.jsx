
import {  useEffect, useState } from 'react';
import styles from './styles.module.css';
const TopProduct = ({topProduct}) => {
    const [product, setProduct] = useState({})
    useEffect(() =>  {
        setProduct(topProduct)
    },[topProduct])
    if (!product) {
        return <div>Loading...</div>
    }
    return(
        <div className= {styles.contain}>
            <img src={`https://localhost:5000${product.image}`}/>
            <article>
                <h5>{product.name}</h5>
                <figure>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index}>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M11.9376 8.70889C11.7434 8.89383 11.6541 9.16128 11.6984 9.42358L12.365 13.0486C12.4213 13.3558 12.2893 13.6668 12.0276 13.8443C11.7711 14.0285 11.4299 14.0506 11.1502 13.9033L7.82888 12.2013C7.7134 12.1409 7.58517 12.1085 7.45393 12.1048H7.25071C7.18022 12.1151 7.11123 12.1372 7.04824 12.1711L3.72617 13.8812C3.56194 13.9622 3.37597 13.991 3.19374 13.9622C2.7498 13.8797 2.45359 13.4642 2.52633 13.0258L3.19374 9.40074C3.23798 9.13623 3.14875 8.8673 2.95452 8.67942L0.246625 6.10065C0.0201542 5.88476 -0.0585855 5.56058 0.044901 5.26807C0.145388 4.9763 0.401854 4.76337 0.711564 4.71547L4.43858 4.18425C4.72204 4.15551 4.97101 3.98605 5.09849 3.73554L6.74078 0.42734C6.77977 0.353661 6.83001 0.285876 6.89076 0.228406L6.95825 0.17683C6.99349 0.138517 7.03399 0.106835 7.07898 0.0810472L7.16072 0.0515755L7.2882 0H7.60391C7.88588 0.0287349 8.13409 0.194513 8.26383 0.442076L9.92786 3.73554C10.0478 3.97647 10.2811 4.14372 10.5503 4.18425L14.2773 4.71547C14.5922 4.75968 14.8555 4.97335 14.9597 5.26807C15.0579 5.56352 14.9732 5.88771 14.7422 6.10065L11.9376 8.70889Z" fill="#FFD66B"/>
                            </svg>
                        </span>
                    ))}
                </figure>
                <p>${parseFloat(product.price?.$numberDecimal || product.price || 0)}</p>
            </article>
        </div>
    );
};

export default TopProduct