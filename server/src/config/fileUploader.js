// import {v2 as cloudinary} from "cloudinary"
// import env from "./env.js"

// cloudinary.config({
//     cloud_name:env.CLOUDINARY_CLOUD_NAME,
//     api_key:env.CLOUDINARY_API_KEY,
//     api_secret:env.CLOUDINARY_API_SECRET
// })
// const fileUploader= async(filePath,folderPath)=>{
//     try {
//         return await cloudinary.uploader.upload(filePath,{
//             resource_type:"image",
//             folder:folderPath
//         })
//     } catch (error) {
//         console.log("Found error", error)
//     }
// }
// export default fileUploader
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploader = async (filePath, folderPath) => {
  try {
    console.log("Uploading file:", filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: folderPath,
    });

    console.log("Cloudinary upload successful:", result.secure_url);

    return result;
  } catch (error) {
    console.log("Cloudinary error:", error);
    throw error;
  }
};

export default fileUploader;