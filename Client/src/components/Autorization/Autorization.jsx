import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import { useState } from 'react';
const Autorization = ({isAutorization}) =>{
    const [showLogin, setShowLogin] = useState(false);
    return(
        <>
            {showLogin ? 
                <Login onSwitchToLogin={() => setShowLogin(false)} isLogin={isAutorization}/> : 
                <SignUp onSwitchToLogin={() => setShowLogin(true)} isSign={isAutorization}/>
            }
        </>
    )
}
export default Autorization