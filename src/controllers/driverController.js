import * as models from "../models/index.js";
const { Driver } = models;

import fs from "fs";
import * as services from "../services/index.js";
const {
  uploadProfilePictureService,
  uploadLicenseService,
  locationService,
  driverSignUpService,
  driverLoginService,
} = services;

import * as utils from "../utils/index.js";
const { locationValidator } = utils.validator;

//signup
const driverSignUp = async (req, res, next) => {
  try {
    const newDriver = await driverSignUpService(req.body);
    return res.status(201).json(newDriver);
  } catch (error) {
    next(error);
  }
};

//login
const driverLogIn = async (req, res, next) => {
  try {
    const Driver = await driverLoginService(req.body);
    return res.status(200).json(Driver);
  } catch (error) {
    next(error);
  }
};

//upload profile picture
const uploadProfileImage = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { path } = req.file;
    const uploadedImage = await uploadProfilePictureService(
      email,
      path,
      Driver
    );

    return res
      .status(200)
      .json({ message: "Image uploaded successfully", image: uploadedImage });
  } catch (error) {
    next(error);
  }
};

//get verified
const uploadLicense = async (req, res) => {
  try {
    if (!req.user || !req.user.email || !req.file || !req.file.path) {
      return res.status(400).json({ error: "Invalid request data" });
    }
    const { email } = req.user;
    const { path } = req.file;

    const license = await uploadLicenseService(email, path);

    if (!license) {
      return res
        .status(400)
        .json({ error: "An error occured uploading license" });
    }

    return res.status(200).json({
      message:
        "License uploaded successfully, your profile will be verified in 24 hours",
    });
  } catch (error) {
    next(error);
  }
};

//check verification status
const checkVerificationStatus = async (req, res) => {
  try {
    const { email } = req.user;
    const driver = await Driver.findOne({ email });
    res.status(200).json({ verificationStatus: driver.verificationStatus });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

//allow-location-tracking and populate location
const allowLocationTracking = async (req, res) => {
  try {
    const locationUpdate = await locationService(req.body);

    return res.status(200).json(locationUpdate);
  } catch (error) {
    next(error);
  }
};

export {
  driverSignUp,
  driverLogIn,
  uploadLicense,
  checkVerificationStatus,
  allowLocationTracking,
  uploadProfileImage,
};
