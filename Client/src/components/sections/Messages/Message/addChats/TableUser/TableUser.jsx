import Addbaton from '@image/Addbaton.svg';
import styles from './styles.module.css';
const TableUser = ({dataUser}) => {
    return(
        <table className= {styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {dataUser.map((item, index) => (
                    <tr key = {index}>
                        <td>{item.name}</td>
                        <td><img src = {Addbaton}/></td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
};

export default TableUser