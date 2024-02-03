const express = require("express")
const {registerUser,loginUser,getAllUsers} = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.get("/",getAllUsers)
userRouter.post("/login",loginUser)

// userRouter.post("/upload",uploadPhoto)

module.exports = userRouter