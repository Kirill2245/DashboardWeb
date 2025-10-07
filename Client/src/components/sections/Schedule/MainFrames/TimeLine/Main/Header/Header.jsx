// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
const Header = ({setDate}) => {
    const [idSelectNav, setIdNav] = useState(1)
    const generateDays = () => {
        const days = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 1); 
        for (let i = 0; i < 15; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i); 
            days.push(date);
        }
        
        return days; 
    };

    const formatDay = (date) => {
        return date.getDate(); 
    };

    const days = generateDays();

    useEffect(() => {setDate(formatDay(days[idSelectNav]))},[idSelectNav,setDate,days])
    return(
        <header className= {styles.header}>
            <nav>
                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => setIdNav(index)}
                        style={idSelectNav === index ? {backgroundColor:'#605BFF', color:'white', height:'100%'}: {}}
                    >
                    {formatDay(day)}
                    </button>
                ))}           
            </nav>
        </header>
    );
};

export default Header