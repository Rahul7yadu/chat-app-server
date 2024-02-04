import { createContext, useContext, useState, useEffect } from "react";
interface AuthContextProps {
    isAuthenticated:boolean
    userData: UserData | null;
    token: string | null;
    setAuthData: ({userData,token}:{userData: UserData | null, token: string | null}) => void;
    logout:()=>void
  }
  
  interface UserData {
   
    id: number;
    username: string;
    email: string;
  }
const authContext = createContext<AuthContextProps>({isAuthenticated:false,userData:null,token:null,setAuthData:()=>{},logout:()=>{}})




const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem("token")&&localStorage.getItem("userData")){
        const token =  localStorage.getItem("token")
        setToken(token)
        const userData = localStorage.getItem("userData")
       userData&& setUserData(JSON.parse(userData))
       setAuthenticated(true)
        }
    },[])


    const setAuthData = ({userData,token}:{userData: UserData | null, token: string | null}) => {
        setUserData(userData);
        setToken(token);
        setAuthenticated(true)

        localStorage.setItem("token",JSON.stringify(token))
        localStorage.setItem("userData",JSON.stringify(userData))
      };

      const logout = ()=>{
              localStorage.clear()
              setUserData(null)
              setToken(null)
              setAuthenticated(false);
      }
    return (

        <authContext.Provider value={{ userData,isAuthenticated:authenticated,setAuthData,token:token,logout}}>

            {children}

        </authContext.Provider>
    )
}

export const useAuthContext = () => {

    return useContext(authContext)

}


export default UserContextProvider;
