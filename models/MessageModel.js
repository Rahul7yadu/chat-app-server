const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    sender:{type:mongoose.Types.ObjectId,ref:"Users"},
    content:{type:String,trim:true},
    chat:{type:mongoose.Types.ObjectId,ref:"Chats"}
},{
    timestamps:true
})


const MessageModel = mongoose.model("Messages",MessageSchema)

module.exports = MessageModel;


