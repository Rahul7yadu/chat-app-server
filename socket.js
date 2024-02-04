let ioInstance;
const MessageModel = require("./models/Message")
function initSocket(io){
    ioInstance = io
    ioInstance.on('connection', (socket) => {
        console.log('a user connected with id: ',socket.id);
        
        socket.on("joinGroup",async (groupId,userId)=>{
          socket.join(groupId); 
    
    
          const groupMessages = await MessageModel.find({ group:groupId }).exec();
         
          socket.emit('groupMessages', groupMessages);
    
          socket.to(groupId).emit('userJoined', userId);
        })
    
        
        socket.on('sendMessage', async (groupId, userId,userName, text,) => {
         
          const newMessage = new MessageModel({
            group:groupId,
            sender:userId,
            text,
            senderName:userName
          });
          await newMessage.save();
      
         
          ioInstance.to(groupId).emit('newMessage', newMessage);
        });
    
        
     
        socket.on('disconnect', async () => {
          console.log('User disconnected:', socket.id);
      
          
          
        });
     
        
    });


}


function emitToGroup(groupId, eventName, data) {
    if (ioInstance) {
      ioInstance.to(groupId).emit(eventName, data);
    }
  }


  module.exports = {
    initSocket,
    emitToGroup
  }