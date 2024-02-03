
const MessageModel = require("./models/Message")
const path = require("path")
const { createServer } = require('node:http');
const cors = require("cors")
const multer = require('multer');
const userRouter = require("./routes/userRoutes")
const groupRouter = require("./routes/groupRoutes")
const connectDb = require("./db/db")
const express = require("express")
const {Server} = require("socket.io");

const app = express()
const server = createServer(app);
const io = new Server(server,{
  cors:"*"
});
connectDb()  

const PORT = process.env.PORT||8000
app.use(express.json())


app.use(cors())
app.use("/",express.static(path.join(__dirname,"/dist")))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use("/api/user",userRouter)
app.use("/api/group",groupRouter)


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });



// Handle file upload endpoint
app.post('/upload', upload.single('file'),  async (req, res) => {
      const {userId,groupId} = req.body;
      console.log("useraid and groupid",userId,groupId)
      console.log("this should be image",req.file)
  const fileDetails = {
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  };
  console.log(fileDetails)
  const message = new MessageModel({
    sender:userId,
    fileUrl:fileDetails.path,
    group:groupId
  })
 const messageWithFile = await  message.save()

  io.to(groupId).emit('newMessage', messageWithFile);

  res.send('File uploaded successfully');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// sockect io connection
io.on('connection', (socket) => {
    console.log('a user connected with id: ',socket.id);
    // user joins the group
    socket.on("joinGroup",async (groupId,userId)=>{
      socket.join(groupId); 


      const groupMessages = await MessageModel.find({ group:groupId }).exec();
     
      socket.emit('groupMessages', groupMessages);

      socket.to(groupId).emit('userJoined', userId);
    })

    // User sends a message to agroup
    socket.on('sendMessage', async (groupId, userId,userName, text,) => {
     
      const newMessage = new MessageModel({
        group:groupId,
        sender:userId,
        text,
        senderName:userName
      });
      await newMessage.save();
  
     
      io.to(groupId).emit('newMessage', newMessage);
    });

    
 
    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.id);
  
      
      
    });
 
    
});





  


server.listen(PORT,()=>console.log("server started on port : ",PORT));