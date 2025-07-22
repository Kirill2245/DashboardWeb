import Sidebar from './Sidebar/Sidebar';
import styles from './styles.module.css';

const Main = () => {
    return(
        <main className= {styles.main}>
            <Sidebar/>
        </main>
    );
}

export default Main