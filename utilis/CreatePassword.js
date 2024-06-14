const bcrypt = require("bcrypt")

const CreatePassword = async (DbPassword, UserPassword)=>{
    var createPassword = await bcrypt.compare(UserPassword, DbPassword)
    return createPassword
}

module.exports = {CreatePassword}