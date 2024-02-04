const mongoose = require("mongoose")

const GroupSchema = mongoose.Schema({
    name:{type:String,required:true},
    chats:[{type:mongoose.Types.ObjectId,ref:"Message"}],
    password:{type:String,}

})

const GroupModel = mongoose.model("Group",GroupSchema)

module.exports = GroupModel;