import express from "express";
const router = express.Router();

import * as middlewares from "../middlewares/index.js";
const { authMiddleware } = middlewares;

import * as utils from "../utils/index.js";
const { uploadImage } = utils;

import * as controllers from "../controllers/index.js";
const { studentController } = controllers;


router
  .post("/student/sign-up", studentController.studentSignUp)
  .post("/student/log-in", studentController.studentLogin)
  .get("/student/find-drivers", authMiddleware, studentController.findDrivers)
  .put(
    "/student/upload-profile-image",
    authMiddleware,
    uploadImage.single("image"),
    studentController.uploadProfileImage
  );

 export default router;
