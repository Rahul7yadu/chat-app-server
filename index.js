
const MessageModel = require("./models/Message")
const path = require("path")
const { createServer } = require('node:http');
const cors = require("cors")
const multer = require('multer');
const userRouter = require("./routes/userRoutes")
const groupRouter = require("./routes/groupRoutes")
const FileUploadRouter = require("./routes/FileUploadRoutes")
const connectDb = require("./db/db")
const express = require("express")
const {Server} = require("socket.io");
const socket = require("./socket")

const app = express()
const server = createServer(app);
const io = new Server(server,{
  cors:"*"
});

const PORT = process.env.PORT||8000
app.use(express.json())
app.use(cors())

connectDb()  
socket.initSocket(io);



app.use("/",express.static(path.join(__dirname,"/client/dist")))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use("/api/user",userRouter)
app.use("/api/group",groupRouter)




app.use("/upload",FileUploadRouter)


 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

server.listen(PORT,()=>console.log("server started on port : ",PORT));

