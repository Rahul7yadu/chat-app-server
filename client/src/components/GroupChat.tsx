import io, { Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '@/context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import ChatUi from './ChatUi';
import SendFileForm from './SendFileForm';
import SendMessageForm from './SendMessageForm';

const GroupChat = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userData, isAuthenticated } = useAuthContext()
  const messageContainer = useRef(null)

  if (!isAuthenticated) {
    navigate("/")
  }
  
  const userId = userData?.id
  const [totalMessages, setTotalMessages] = useState<any>([])

  

useEffect(()=>{
  if(groupId){
      try{

    fetch(`/api/group/${groupId}`).then((res)=>res.json()).then(data=>console.log(data))
      }catch(error){
        console.log(error)
      }

  }
},[groupId])


  useEffect(() => {
    const newSocket = io("");

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('joinGroup', groupId, userId);
    });

    newSocket.on('groupMessages', (groupMessages) => {
      console.log('Received group messages:', groupMessages);
      setTotalMessages(groupMessages)
    });

    newSocket.on('newMessage', (newMessage) => {
      console.log('Received new message:', newMessage);

      setTotalMessages((prev: any) => [...prev, newMessage])
      
      return;
    });

    newSocket.on('userJoined', (joinedUserId) => {
      console.log('User joined:', joinedUserId);
    });

    newSocket.on('userLeft', (leftUserId) => {
      console.log('User left:', leftUserId);
    });
    setSocket(newSocket)
    return () => {
      newSocket.disconnect();
    };


  }, [groupId, userId]);


  return (
    <div className='flex flex-col h-screen '>
      <div className='p-4 m-4 bg-background  h-screen overflow-y-scroll' ref = {messageContainer}>
        {totalMessages && totalMessages.map((msg: any) => 
        <ChatUi key={msg._id} 
            text={msg.text} 
           senderId={msg.sender}
          name={msg.senderName} 
          userId={userId?.toString() || ""} 
          fileUrl={msg.fileUrl} />)}
      </div>
      <div className='w-full  flex flex-col sm:flex-row'>
       <SendMessageForm socket={socket} />
        <SendFileForm/>
      </div>
    </div>
  )
}


export default GroupChat



