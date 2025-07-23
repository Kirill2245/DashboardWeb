import { useEffect, useState } from "react"
import Autorization from "./components/Autorization/Autorization"
import Confirim from "./components/common/Confirim/Confirim"
import Main from "./components/Main/Main"
import { fetch_login } from '@api/user_requests.js';

function App() {
  const [login, isLogin] = useState(true);
  const [main, isMain] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const checkAutoLogin = async () => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    const UserId = localStorage.getItem('rememberedId')
    if (!savedEmail || !savedPassword) {
      setIsLoading(false);
      return;
    }
    if (!UserId){console.log(UserId)}
    try {
      const response = await fetch_login({
        email: savedEmail,
        password: savedPassword
      });

      if (response.success) {
        isLogin(true);
        isMain(true);
        console.log("Автоматический вход");
        console.log(response)
        localStorage.getItem('rememberedId', response.user.id)
      }
    } catch (error) {
      console.error("Автоматический вход не удался:", error);
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkAutoLogin();
  }, []);
  if (isLoading) {
    return <div className="loading-screen">Проверка авторизации...</div>;
  }
  return (
    <>
      {
        !login ? 
          (<Autorization isAutorization={() => isLogin(true)}/>) : 
          (!main ? 
            (<Confirim isMain = {() => isMain(true)}/>):
            (
              <Main isOut={() => {
                  isLogin(false) 
                  localStorage.removeItem('rememberedEmail');
                  localStorage.removeItem('rememberedPassword');
                }
              }/>
            )
          )
      }
    </>
  )
}

export default App
