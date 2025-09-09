import styles from './styles.module.css';
import MessageProfile from '@image/MessageProfile.svg';
import Call from '@image/Call.svg'
import LocationProfile from '@image/LocationProfile.svg'
const Profile = ({dataFromProfile}) => {

    return(
        <section className= {styles.section}>
            <header>
                <img src = {dataFromProfile.img}/>
                <h3>{dataFromProfile.name}</h3>
                <p>UI/UX Designer</p>
            </header>
            <address>
                <h4>Contact Info</h4>
                <div>
                    <img src = {MessageProfile}/>
                    <p>{dataFromProfile.email}</p>
                </div>
                <div>
                    <img src = {Call}/>
                    <p>{dataFromProfile.phone}</p>
                </div>
                <div>
                    <img src = {LocationProfile}/>
                    <p>2239  Hog Camp Road</p>
                </div>
            </address>
        </section>
    );
};

export default Profile