const express = require("express")
const {CreatePost, GetPost, DeletePost, SignUp, LogIn, GetPostsForMyProfile, GetPostForProfile, ForLikePost, ForComments, DeleteSinglePost} = require("../Controllers/User.controllers")
const upload = require("../utilis/Multer")
const { isLoggedIn } = require("../Middlewares/IsLoggedIn")

const router = express.Router()
router.post("/create-post",isLoggedIn, upload.single("image"), CreatePost)
router.get("/get-post", GetPost)
router.delete("/delete-post/:id", DeletePost )
router.post("/signup", upload.single("image"), SignUp)
router.post("/login", LogIn)
router.get("/getpostprofile",isLoggedIn, GetPostForProfile )
router.get("/getforlike/:id", isLoggedIn, ForLikePost)
router.post("/postforcomment/:id", isLoggedIn, ForComments)
router.delete("/deletesinglepost/:id", DeleteSinglePost)



module.exports = router