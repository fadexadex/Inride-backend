import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      if (!result || !result.secure_url) {
        reject(new Error("Failed to upload image or secure URL is missing."));
        return;
      }
      resolve({
        url: result.secure_url,
        resource_type: "auto",
      });
    });
  });
};

export default cloudinaryUploadImage;
