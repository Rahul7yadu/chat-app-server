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
        name,password
})
  const groupData = await newGroup.save()

  res.json(groupData)
}

const fetchGroupById = (req,res)=>{
  const groupId = req.params;
  console.log(groupId)
}


GroupRouter.get("/all",fetchGroups);

GroupRouter.post("/create",createGroups);
GroupRouter.get("/:id",fetchGroupById)

module.exports = GroupRouter