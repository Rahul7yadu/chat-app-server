import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { useAuthContext } from "@/context/UserContext"
const Login = () => {
  const [error, setError] = useState<null | string>(null)
  const { setAuthData } = useAuthContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  console.log(email)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {

      const res = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'

        },
      })
      if (!res.ok) {
        const { message } = await res.json();
        return setError(message)
      }
      const data = await res.json()
      setAuthData({ userData: { id: data.user._id, username: data.user.name, email: data.user.email }, token: data.token })
    } catch (error) {
      console.log(error)
setError(JSON.stringify(error))
    }
  }
  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      {error && <p className="text-red-500 text-lg">{error}</p>}
      <div className="space-y-2 text-center mt-10">
        <h1 className="text-3xl font-bold">Log In</h1>
        <p className="text-gray-500 dark:text-gray-400">Log into your account by filling the form below</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => handleLogin(e)}>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" placeholder="m@example.com" required type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" required type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full" type="submit">
          Log In
        </Button>
      </form>
    </div>
  )
}


export default Login;