import { useState } from "react"
import Autorization from "./components/Autorization/Autorization"
import Confirim from "./components/common/Confirim/Confirim"
import Main from "./components/Main/Main"

function App() {
  const [login, isLogin] = useState(true)
  const [main, isMain] = useState(true)
  return (
    <>
      {
        !login ? 
          (<Autorization isAutorization={() => isLogin(true)}/>) : 
          (!main ? 
            (<Confirim isMain = {() => isMain(true)}/>):
            (
              <Main isOut={() => isLogin(false)}/>
            )
          )
      }
    </>
  )
}

export default App
