const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    sender:{type:mongoose.Types.ObjectId,ref:"User"},
    senderName:{type:String},
    text:{type:String,trim:true},
    group:{type:mongoose.Types.ObjectId,ref:"Group"},
    fileUrl:{type:String},
    audioUrl:{type:String}
},{
    timestamps:true
})


const MessageModel = mongoose.model("Message",MessageSchema)

module.exports = MessageModel;