const jwt = require("jsonwebtoken")
const UserSchema = require("../Model/User.schema")

const isLoggedIn = async (req, res, next) => {

    var token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.send({ message: "Please first login!", success: false  })
    }

    var userData = jwt.verify(token, process.env.SECRET_KEY)

    var user = await UserSchema.findOne({ _id: userData.userid })

    if (!user) {
        return res.send({ message: "Please first login!" })
    }

    req.user = user 

    next()

}

module.exports = { isLoggedIn }