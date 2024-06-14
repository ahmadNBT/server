const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const LikeSchema = mongoose.Schema({
   userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"

   },
   postId: {
    type: mongoose.Schema.ObjectId,
    ref: "Post"

   }
})

module.exports = mongoose.model("Like", LikeSchema)