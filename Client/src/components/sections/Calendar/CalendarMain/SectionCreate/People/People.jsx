
import styles from './styles.module.css';
import UserElem from './UserElem/UserElem';

const People = () => {
    const testList = [
        {name:"Eddie Lobanovskiy", email:"laboanovskiy@gmail.com"},
        {name:"Eddie Lobanovskiy", email:"laboanovskiy@gmail.com"},
        {name:"Eddie Lobanovskiy", email:"laboanovskiy@gmail.com"},
    ]
    return(
        <div className= {styles.section}>
            <h3>People</h3>
            <div className={styles.contain}>
                <input type='text' placeholder='Search for People'/>
                <div className={styles.userList}>
                    {testList.map((item,index) => (
                        <UserElem name={item.name} email={item.email} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default People