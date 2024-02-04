import { useState } from "react"
import { Button } from "../ui/button"
import SignUp from "./SignUp"
import Login from "./Login"
const Index = () => {
    const [login,setLogin]  = useState(true)

  return (
    <div className="mx-auto my-16 max-w-[350px] space-y-6">
        <div className="flex justify-center space-x-4 mb-6">
        <Button className="w-1/2" onClick={()=>setLogin(false)} variant={login?"secondary":'default'}>Sign Up</Button>
        <Button className="w-1/2" onClick={()=>setLogin(true)} variant={login?'default':'secondary'}>Log In </Button>
      </div>
        {login?<Login/>:<SignUp/>}
    </div>
  )
}
export default Index