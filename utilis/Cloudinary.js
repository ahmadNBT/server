const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: 'dddkdixfb',
    api_key: '634947963459788',
    api_secret: 'HDCEhvA7CF4ai4I_LzuAbowMFDQ' 
})

const Uploadfiles = async(filepath)=>{
    try{
        var files = await cloudinary.uploader.upload(filepath)
        console.log(files.secure_url, "image");

        if(files){
            return files.secure_url
        }
    }
    catch(error){
        
    }
}

module.exports = Uploadfiles