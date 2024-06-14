const bcrypt = require("bcrypt")

const HashPassword = async (password)=>{
    var hashpassword = await bcrypt.hash(password, 10)
    return hashpassword
}
module.exports = {HashPassword}