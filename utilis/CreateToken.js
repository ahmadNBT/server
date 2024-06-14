const jwt = require("jsonwebtoken")

const CreateToken =(userID)=>{
    var token = jwt.sign({userid: userID}, process.env.SECRET_KEY, {expiresIn: "7d"})
    return token
}

module.exports = {CreateToken}