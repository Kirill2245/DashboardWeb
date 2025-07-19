import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import { useState } from 'react';
const Autorization = () =>{
    const [showLogin, setShowLogin] = useState(false);
    return(
        <>
            {showLogin ? 
                <Login onSwitchToLogin={() => setShowLogin(false)}/> : 
                <SignUp onSwitchToLogin={() => setShowLogin(true)} />
            }
        </>
    )
}
export default Autorization