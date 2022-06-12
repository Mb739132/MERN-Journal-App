const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const cloudinary = require('cloudinary').v2;
console.log("\n\t Cloud name: ", process.env.REACT_APP_CLOUD_NAME)

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_API_KEY,
    api_secret: process.env.REACT_APP_API_SECRET,
    secure: true
  });

  cloudinary.uploader
    .upload("../client/public/images/images.png",{
        resource_type: "image",
    })
    .then((result) => {
        console.log("success", JSON.stringify(result, null,2))
    })
    .catch((error) => {
        console.log("error", JSON.stringify(error, null,2))
    });