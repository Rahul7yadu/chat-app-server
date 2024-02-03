const mongoose = require("mongoose")
const {genSalt,hash,compare} = require("bcrypt")
const UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    
},
{
    timestamps:true
}
)

UserSchema.methods.checkPassword = async function (enteredPassword){
      const result =  await  compare(enteredPassword,this.password)
      
      return result
}

UserSchema.pre("save",async function(next){
    if(!this.isModified){
            next()
    }
    const salt = await genSalt(8)
   
    const hashedPassword = await hash(this.password,salt)
   this.password = hashedPassword
})

const UserModel  = mongoose.model("Users",UserSchema)

module.exports = UserModel 