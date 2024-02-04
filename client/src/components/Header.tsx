import { useAuthContext } from "@/context/UserContext"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
const Header = () => {
  const {isAuthenticated} = useAuthContext()

  
  return (
    <div className="flex bg-slate-600 p-2 sticky">
            {isAuthenticated?<AuthUser/>:<UnAuthUser/>}
    </div>
  )
}
export default Header



const AuthUser = ()=>{
  const {logout,userData} = useAuthContext()
  
return(
  <div className="flex justify-between w-full">
          <Avatar>
            <AvatarImage src="/chat.png"/>
          </Avatar>
          <div>{userData?.username}</div>
         <a href="/dashboard">
          <Button>Dashboard</Button>
         </a>
          <Button onClick={logout}>Logout</Button>
  </div>
)
}


const UnAuthUser = ()=>{
  return (
    <div className="flex justify-between w-full">
        <Avatar>
            <AvatarImage src="/chat.png"/>
          </Avatar>
          <div className="text-lg text-foreground">
             Chat with friends
          </div>
    </div>
  )
}