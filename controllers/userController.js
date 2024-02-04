const UserModel = require("../models/UserSchema");
const { compare } = require("bcrypt")
const createJwt = require("../db/jwt")
const registerUser = async (req, res) => {


    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "please provide all fields" })
    }

    const userExist = await UserModel.findOne({ email: email })

    if (userExist) {
        return res.status(400).json({ message: "user already exist" })
    }

    const user = new UserModel({
        name, email, password
    })

    const userData = await user.save()

    const token = createJwt(name)
    return res.json({
        userData,
        token
    })
}


const loginUser = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "provide email and password" })
    }
    let user;
    try {

        user = await UserModel.findOne({ email: email })
        console.log(user)
    } catch (error) {
        return res.status(500).json({ message: "serve error" })
    }
    if (!user) {
        return res.status(400).json({ message: " user does not exist" })
    }

    const isMatch = await compare(password, user.password)



    const token = createJwt(email)
    if (user && isMatch) {
        return res.json({ user, token })
    }
    return res.status(400).json({ message: "incorrect password" })

}

const getAllUsers = async (req, res) => {
    const allUsers = await UserModel.find().select("-password")
    //    console.log(allUsers)
    return res.json(allUsers)
}

module.exports = { registerUser, loginUser, getAllUsers }