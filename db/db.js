const mongoose = require('mongoose')

const connectDb = async ()=>{
    try {
        const newConnection = await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database: ",newConnection.connection.host)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb