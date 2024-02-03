const mongoose = require("mongoose")

const ChatSchema = mongoose.Schema({
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    users:[{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    }],
    latestMessage:{type:mongoose.Types.ObjectId,ref:"Messages"},
    groupAdmin:{type:mongoose.Types.ObjectId,ref:"Users"},
},{
    timestamps:true
})


const ChatModel = mongoose.model("Chats",ChatSchema)

module.exports = ChatModel