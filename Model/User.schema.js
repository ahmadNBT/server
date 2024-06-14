const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    url: {
        type: String
    },
    posts: {
        type: [mongoose.Schema.ObjectId],
        ref: "Post"
    }
})

module.exports = mongoose.model("User", UserSchema)