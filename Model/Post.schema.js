const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const PostSchema = mongoose.Schema({
    url: {
        type: String
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Post", PostSchema)