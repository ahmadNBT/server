const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const router = require("./Routes/User.routes")
const dotenv = require("dotenv")

const app = express()

dotenv.config({path: "./.env"})
app.use(cors())
app.use(express.json())
app.use("/", router)

mongoose.connect("mongodb+srv://ahmed:db3699@cluster0.64w6f0j.mongodb.net/Create-Post").
then(()=>{
    console.log("Db running");
})



app.listen(2000, ()=>{
    console.log("Server Running");
})