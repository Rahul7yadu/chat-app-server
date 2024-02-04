const express = require("express")
const multer = require('multer');
const MessageModel = require("./../models/Message")
const socket = require("./../socket")
const FileUploadRouter = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        
        cb(null, file.originalname);
        
    },
});

const upload = multer({ storage: storage });



FileUploadRouter.post('/image', upload.single('file'), async (req, res) => {
    const { userId, groupId ,name} = req.body;
    console.log("useraid and groupid", userId, groupId)
    console.log("this should be image", req.file)
    const fileDetails = {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
    };
    console.log(fileDetails)
    const message = new MessageModel({
        sender: userId,
        fileUrl: fileDetails.path,
        group: groupId,
        senderName:name
    })
    const messageWithFile = await message.save()
    socket.emitToGroup(groupId, 'newMessage', messageWithFile)


    res.send('File uploaded successfully');
});


FileUploadRouter.post('/audio', upload.single('audio'), async (req, res) => {
    const { userId, groupId } = req.body;
    console.log("useraid and groupid", userId, groupId);
    console.log("this should be audio", req.file);
  
    const fileDetails = {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    };
  
    console.log(fileDetails);
  
    const message = new MessageModel({
      sender: userId,
      audioUrl: fileDetails.path,
      group: groupId,
    });
  
    const messageWithFile = await message.save();
    socket.emitToGroup(groupId, 'newMessage', messageWithFile);
  
    res.send('Audio file uploaded successfully');
  });


module.exports = FileUploadRouter