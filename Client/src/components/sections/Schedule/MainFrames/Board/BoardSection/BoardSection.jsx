
import { useEffect } from 'react';
import CardTask from './CardTask/CardTask';
import styles from './styles.module.css';

const BoardSection = ({name, data}) => {
    useEffect(() => {console.log('Task --',data)},[data])
    return(
        <div className= {styles.contain}>
            <header className= {styles.header}><h3>{name}</h3></header>
            <div className={styles.cardBox}>
                {data.map((item, index)=>(
                    <CardTask 
                        title={item.data.title} 
                        tag = {item.data.tags} 
                        description={item.data.description} 
                        countMember={item.data.memberList?.length || 0} 
                        image={item.data.image}
                        key = {index}
                        likeCount={item.data.likeCount || 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardSection