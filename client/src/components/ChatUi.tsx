import { Card,CardContent } from "./ui/card"
const ChatUi = ({ text, senderId, userId, name, fileUrl }: { text: string, senderId: string, userId: string, name: string, fileUrl: string }) => {
    let isOwn = false
    if (userId === senderId) {
      isOwn = true
    }
    if (fileUrl || text.length === 0) {
      return (
        <Card className="">
          {name}{text}
          <CardContent >
            <img src={`${fileUrl}`} className='w-40 h-60' />
          </CardContent>
        </Card>
      )
    }
    return (
      <Card className=''>
       {!isOwn&&name}
        <CardContent className={`p-2 m-4 border-border border-2  w-fit rounded-lg ${isOwn ? ' bg-green-400 ' : ''}`}>
          {text}
        </CardContent>
      </Card>
    )
  }

  export default ChatUi