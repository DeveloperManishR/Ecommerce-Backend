import { v2 as uploadImagesinCloudinary } from "cloudinary";
import fs from "fs"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uplodadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
   fs.unlinkSync(filepath)
    console.log(error);
    return null
  }
};
