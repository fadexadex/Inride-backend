import * as utils from "../utils/index.js";
const { cloudinaryUploadImage } = utils;
import * as middlewares from "../middlewares/index.js";
const { AppError } = middlewares;
import fs from "fs";

const uploadProfilePictureService = async (email, path, user) => {
  const {url} = await cloudinaryUploadImage(path);
  if(!url) {
    throw new AppError("Image upload failed", 500);
  }

  fs.unlinkSync(path);

  const updateLink = await user.findOneAndUpdate(
    { email: email },
    { imageUrl: url },
    { new: true, projection: { password: 0 } }
  );

  if (!updateLink) {
    throw new AppError("Image upload failed", 500);
  }
  return updateLink.imageUrl;
};
export default uploadProfilePictureService;
