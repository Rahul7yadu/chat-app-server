import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useAuthContext } from "@/context/UserContext";
import { useParams } from "react-router-dom";
import { FileIcon } from "lucide-react";

const SendFileForm = ()=>{
    const { userData } = useAuthContext()
    const { groupId } = useParams()
    const [file, setFile] = useState<File | null>(null)
    const submitFileHandler = async () => {
      if (!userData || !groupId) return;
  
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userData?.id.toString());
        formData.append('groupId', groupId);
        formData.append("name",userData.username)
        const res = await fetch("/upload/image", {
          method: 'POST',
          body: formData,
  
        })
        const data = await res.text();
        console.log(data)
      }
    }
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files && event.target.files[0];
  
      if (selectedFile) {
        setFile(selectedFile);
      }
    }
  
  
    return (
      <div className='flex border-2 border-black '>
      <Input type="file" onChange={e => handleFileChange(e)}  accept="image/*" /><FileIcon className="w-10 h-10"/>
      <Button onClick={submitFileHandler}>send Image</Button>
    </div>
    )
  }
  

  export default SendFileForm