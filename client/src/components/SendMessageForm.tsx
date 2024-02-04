import { useState } from "react"
import { Socket } from 'socket.io-client';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useAuthContext } from "@/context/UserContext";
import { useParams } from "react-router-dom";
const SendMessageForm = ({socket}:{socket:Socket|null})=>{
    const [message, setMessage] = useState("")
    const { userData} = useAuthContext()
    const { groupId } = useParams()
    
    console.log(userData?.id)
    const messageSendHandler = (e: React.FormEvent) => {
      e.preventDefault()
      socket?.emit("sendMessage", groupId, userData?.id, userData?.username, message)
      setMessage("")
    }
  
    
  
    return(
      <form className='p-4 flex border-2 border-black flex-1' onSubmit={(e) => messageSendHandler(e)}>
  
      <Input placeholder='enter message' onChange={e => setMessage(e.target.value)} value={message} />
      <Button type='submit'>send</Button>
    </form>
    )
  }

  export default SendMessageForm;