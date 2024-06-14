const { pipeline } = require("nodemailer/lib/xoauth2");
const CommentSchema = require("../Model/Comment.schema");
const LikeSchema = require("../Model/Like.schema");
const PostSchema = require("../Model/Post.schema");
const UserSchema = require("../Model/User.schema");
const Uploadfiles = require("../utilis/Cloudinary");
const { CreatePassword } = require("../utilis/CreatePassword");
const { CreateToken } = require("../utilis/CreateToken");
const { HashPassword } = require("../utilis/HashPassword");

const CreatePost = async (req, res) => {

    var url = await Uploadfiles(req.file.path)

    req.body.url = url
    req.body.userId = req.user._id

    var response = await PostSchema.create(req.body)
    console.log(res);

    var resps = await UserSchema.findOne({ _id: req.user._id })
    console.log(resps);
    resps.posts.push(response._id)
    resps.save()


    console.log(response, "response");
    res.send({ message: "Create Post", success: true })

}


const GetPost = async (req, res) => {
    var response = await PostSchema.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userId"
            }
        },
        {
            $unwind: "$userId"
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "postId",
                as: "likes"
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userId",
                        },
                    },
                    {
                        $unwind: "$userId"
                    },
                ]
            }

        }
    ])
    res.send({ response, success: true })
}




const DeletePost = async (req, res) => {

    console.log(req.params.id);
    var response = await PostSchema.findOneAndDelete({ _id: req.params.id })
    res.send({ message: "Post Deleted", success: true })
}

const DeleteSinglePost = async (req, res) => {

    console.log(req.params.id);
    var response = await PostSchema.findOneAndDelete({ _id: req.params.id })
    res.send({ message: "Post Deleted", success: true })
}

const SignUp = async (req, res) => {
    var url = await Uploadfiles(req.file.path)

    req.body.url = url

    var response = await UserSchema.findOne(
        { name: req.body.name, email: req.body.email }
    )
    if (response) {
        return res.send({ message: "The user already exist!", success: false })

    } else {
        const newPass = await HashPassword(req.body.password)
        console.log(newPass);
        req.body.password = newPass
        var resp = await UserSchema.create(req.body)
        console.log(response, "response");
        res.send({ message: "Successfully SignUp", success: true })

    }
}

const LogIn = async (req, res) => {

    var response = await UserSchema.findOne(
        { email: req.body.email }
    )
    if (response) {
        if (await CreatePassword(response.password, req.body.password)) {
            var token = CreateToken(response._id)
            return res.send({ message: "Successfully LogIn!", success: true, token, response })
        }
        else {
            return res.send({ message: "Password does'nt match!", success: false })
        }

    } else {
        res.send({ message: "The user does'nt match", success: false })
    }
}

const GetPostForProfile = async (req, res) => {

    var response = await UserSchema.findOne({ _id: req.user._id })
    // response.posts.findOne({_id: req.user._id})

    var resp = await PostSchema.find({ userId: response._id })
    res.send({ message: "Successfully get", array: resp })
}

const ForLikePost = async (req, res) => {

    var likeObject = {
        userId: req.user._id,
        postId: req.params.id
    }
    // existing
    // if not then create
    // if exist then delete

    var exist = await LikeSchema.findOne({ userId: likeObject.userId, postId: likeObject.postId })

    if (!exist) {
        var response = await LikeSchema.create(likeObject)
        console.log("created", response);
        res.send({ message: "Like" })
    }
    else {
        var response = await LikeSchema.deleteOne({ userId: likeObject.userId, postId: likeObject.postId })
        console.log("deleted", response);
        res.send({ message: "Unlike" })
    }
}

const ForComments = async (req, res) => {

    var CommentObject = {
        userId: req.user._id,
        postId: req.params.id,
        comment: req.body.input

    }
    console.log(CommentObject);
    var response = await CommentSchema.create(CommentObject)
    console.log("created", response);
    res.send({ message: "Commented", response })
}




module.exports = { CreatePost, GetPost, DeletePost, SignUp, LogIn, GetPostForProfile, ForLikePost, ForComments, DeleteSinglePost }