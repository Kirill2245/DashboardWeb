import Product from './Product/Product';

const Analytics = ({isOverlay, idUser}) => {
    return(
        <>
            <Product isOverlay={isOverlay} idUser={idUser}/>
        </>
    );
};

export default Analytics