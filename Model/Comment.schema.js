const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const CommentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"

    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "Post"
    },
    comment: {
        type: String
    }
})

module.exports = mongoose.model("Comment", CommentSchema)