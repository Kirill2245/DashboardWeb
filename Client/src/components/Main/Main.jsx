import Sidebar from './Sidebar/Sidebar';
import styles from './styles.module.css';

const Main = ({isOut}) => {
    return(
        <main className= {styles.main}>
            <Sidebar isOut={isOut}/>
        </main>
    );
}

export default Main