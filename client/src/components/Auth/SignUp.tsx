import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/UserContext"
export default function SignUp() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const {setAuthData} = useAuthContext()

  const handRegister = async(e:React.FormEvent)=>{
        e.preventDefault()
        try{

        
        const res = await fetch("/api/user/register",{
          method:"POST",
          body:JSON.stringify({name,email,password}),
          headers: {
            'Content-Type': 'application/json'
           
          },
        })
        if(!res.ok){
          const {message} = await res.json();
          return  setError(message) 
        }
        const data = await res.json()
        console.log(data)
        setAuthData({userData:{id:data.userData._id,username:data.userData.name,email:data.userData.email},token:data.token})
      }catch(error){
        setError(JSON.stringify(error))
      }

  }

  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        {error&&<div className="text-lg text-red-400">{error}</div>}
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Create your account by filling the form below</p>
      </div>
      <form className="space-y-4" onSubmit={(e)=>handRegister(e)}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" required onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  )
}




