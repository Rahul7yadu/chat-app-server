const jwt = require("jsonwebtoken")



function createJwt(payload){

    const token = jwt.sign(payload,"my-secret")
    return token;
}


module.exports = createJwt