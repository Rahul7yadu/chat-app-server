import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Link, useNavigate} from "react-router-dom"
import { useAuthContext } from "@/context/UserContext"
const Dashboard = () => {
    const navigate = useNavigate()
    const {isAuthenticated} =  useAuthContext()
    const [newGroupAdded,setNewGroupAdded] = useState("")
    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/")
        }
    },[isAuthenticated])

function groupAdded(newGroup:string){
        setNewGroupAdded(newGroup)
}

  return (
    <div className="flex flex-col    justify-between  mt-12 p-4 w-full">
        <CreateGroup groupAdded={groupAdded}/>
        <Groups newGroupAdded={newGroupAdded}/>

    </div>
  )
}
export default Dashboard


const CreateGroup = ({groupAdded}:{groupAdded:(newGroup:string)=>void})=>{
    const [name,setName] = useState("")
const submitHandler = (e:React.FormEvent)=>{

    e.preventDefault()
        fetch("/api/group/create",{
            method:"POST",
            body:JSON.stringify({name}),
            headers:{
                "Content-type":"application/json"
            }
        })

    console.log(name)
    groupAdded(name)
    setName("")
}

    return(
       <Card>
        <CardHeader>
            <CardTitle>
                Create a Group
            </CardTitle>
        </CardHeader>
        <CardContent>

        <form onSubmit ={(e)=>submitHandler(e)} className="flex flex-col justify-center gap-4">
            <Input placeholder="Group Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <Button>submit</Button>
        </form>
        </CardContent>
       </Card>
    )
}




const Groups = ({newGroupAdded}:{newGroupAdded:string})=>{
        const [groups,setGroups] = useState<[{name:string,_id:string}]|[] >([])
    const fetchGroups = async()=>{
       const allGroups=  await fetch("/api/group/all")
       const data = await allGroups.json()
       return data;
    }
    useEffect(()=>{
            fetchGroups().then((data)=>setGroups(data))
            
    },[newGroupAdded])
    return (<Card className=" flex flex-col gap-4 border-2 border-black overflow-y-scroll h-96">
        <CardTitle className="text-2xl text-center"> Groups</CardTitle>
            {groups.map((group,id)=>{
            return(
            <Card key={id} className="border-2 border-border"> 
            <CardContent><CardTitle>{group.name}</CardTitle></CardContent>
            <CardFooter>
            <Link to={`/group/${group._id}`}>
                <Button>JoinGroup</Button>
                </Link>
            </CardFooter>
            </Card>
            )})}
    </Card>)
}