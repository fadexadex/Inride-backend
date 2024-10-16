// const express = require("express");
import express from "express";
const router = express.Router();

import * as controllers from "../controllers/index.js";

import * as utils from "../utils/index.js";
const { uploadImage } = utils;

import * as middlewares from "../middlewares/index.js";
const { authMiddleware } = middlewares;
const { driverController } = controllers;

router
  .post("/driver/sign-up", driverController.driverSignUp)
  .post("/driver/log-in", driverController.driverLogIn)
  .put(
    "/driver/upload-license",
    authMiddleware,
    uploadImage.single("image"),
    driverController.uploadLicense
  )
  .get(
    "/driver/check-verification-status",
    authMiddleware,
    driverController.checkVerificationStatus
  )
  .put(
    "/driver/allow-location-tracking",
    authMiddleware,
    driverController.allowLocationTracking
  )
  .put(
    "/driver/upload-profile-image",
    authMiddleware,
    uploadImage.single("image"),
    driverController.uploadProfileImage
  );

export default router;
