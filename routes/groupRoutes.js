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
  const id = req.params.id;
  console.log("req.params",req.params)
  console.log(groupId)
  if(!id){
    return res.status(300).json({message:"please provide group id"})
  }

const groupData = await GroupModel.findById(id)
return res.json(groupData)
console.log(groupData)
}


GroupRouter.get("/all",fetchGroups);

GroupRouter.post("/create",createGroups);
GroupRouter.get("/:id",fetchGroupById)

module.exports = GroupRouter