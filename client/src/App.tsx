import Index from "./components/Auth/Index"
import { useNavigate ,Outlet} from "react-router-dom"
import { useAuthContext} from "./context/UserContext"
import { useEffect } from "react"
function App() {
  const {isAuthenticated} = useAuthContext()
  const navigate = useNavigate()
  useEffect(()=>{
  console.log(isAuthenticated)
  if(isAuthenticated){
     navigate("/dashboard")
  }
  },[isAuthenticated])
  return (
    <div className="p-2 m-2">
    <Index/>
    <Outlet/>
    </div>
  )
}

export default App  
