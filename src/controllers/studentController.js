import * as models from "../models/index.js";
const { Students } = models;


import * as services from "../services/index.js";
const {
  uploadProfilePictureService,
  studentSignUpService,
  studentLoginService,
  findDriversService,
} = services;

//sign up
const studentSignUp = async (req, res, next) => {
  try {
    const newStudent = await studentSignUpService(req);
    return res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

//login
const studentLogin = async (req, res, next) => {
  try {
    const Student = await studentLoginService(req);
    return res.status(200).json(Student);
  } catch (error) {
    next(error);
  }
};

const uploadProfileImage = async (req, res, next) => {
  try {
    const { email } = req.user;
    console.log(req.user);
    const { path } = req.file;
    const uploadedImage = await uploadProfilePictureService(
      email,
      path,
      Students
    );

    return res
      .status(200)
      .json({ message: "Image uploaded successfully", user: uploadedImage });
  } catch (error) {
    next(error);
  }
};

//Find Nearby Drivers
const findDrivers = async (req, res, next) => {
  try {
    const query = req.query;
    const nearestDrivers = await findDriversService(query);
    if (!nearestDrivers) {
      return res.status(404).json({ message: "No Drivers Nearby" });
    }
    return res.status(404).json(nearestDrivers);
  } catch (error) {
    next(error);
  }
};

export { studentSignUp, studentLogin, findDrivers, uploadProfileImage };
