import * as utils from "../../utils/index.js";
const { locationValidator } = utils.validator;

import * as middlewares from "../../middlewares/index.js";
const { AppError } = middlewares;

import * as models from "../../models/index.js";
const { Driver } = models;



const findDriversService = async (query) => {
  const { error, value } = locationValidator.validate(query);
  if (error) {
    throw new AppError("Something Went Wrong Invalid Coordinates", 400);
  }

  const { longitude, latitude } = value;

  const nearestDrivers = await Driver.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: 1000, // 1000 meters
      },
    },
    verificationStatus: "Verified",
  }).select("-password -driver_license -__v");

  if (nearestDrivers.length === 0) {
    return false;
  }

  return nearestDrivers;
};

export default findDriversService;
