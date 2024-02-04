const express = require("express")
const GroupModel = require("../models/Group")
const GroupRouter = express.Router()





const fetchGroups = async (req,res)=>{

    const allGroups = await GroupModel.find();

    return res.json(allGroups)
}


const createGroups = async(req,res)=>{
    const {name,password} = req.body
const newGroup = new GroupModel({
        name
})
  const groupData = await newGroup.save()

  res.json(groupData)
}

const fetchGroupById = async (req,res)=>{
  const {groupId} = req.params;
  console.log("req.params",req.params)
  console.log(groupId)
  if(!groupId){
    return res.status(300).json({message:"please provide group id"})
  }

const groupData = await GroupModel.find({_id:groupId})
return res.json(groupData)
console.log(groupData)
}


GroupRouter.get("/all",fetchGroups);

GroupRouter.post("/create",createGroups);
GroupRouter.get("/:id",fetchGroupById)

module.exports = GroupRouter