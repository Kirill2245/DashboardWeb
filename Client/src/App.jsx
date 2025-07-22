import { useState } from "react"
import Autorization from "./components/Autorization/Autorization"

function App() {
  const [login, isLogin] = useState(false)
  return (
    <>
      {!login ? (<Autorization isLogin={() => isLogin(true)}/>) : (<p>True</p>)}
    </>
  )
}

export default App
