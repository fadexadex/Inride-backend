import * as utils from "../../utils/index.js";
const { cloudinaryUploadImage } = utils;

import * as models from "../../models/index.js";
const { Driver } = models;

import * as middlewares from "../../middlewares/index.js";
const { AppError } = middlewares;

import fs from "fs";

//get verified
const uploadLicenseService = async (email, path) => {
  const { url } = await cloudinaryUploadImage(path, "images");
  if (!url) {
    throw new AppError("License upload failed", 500);
  }
  fs.unlinkSync(path);
  const updateLink = await Driver.findOneAndUpdate(
    { email: email },
    { driver_license: url, verificationStatus: "awaitingVerification" },
    { new: true }
  );
  if (!updateLink) {
    throw new AppError("License upload failed", 500);
  }
  return updateLink;
};

export default uploadLicenseService;
