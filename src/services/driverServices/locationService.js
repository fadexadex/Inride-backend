import * as models from "../../models/index.js";
const { Driver } = models;

import * as middlewares from "../../middlewares/index.js";
const { AppError } = middlewares;

import * as utils from "../../utils/index.js";
const { locationValidator } = utils.validator;

const locationService = async (body) => {
  const { error, value } = locationValidator.validate(req.body);
  if (error) {
    throw new AppError(400, "Validation Error", error.details[0].message);
  }
  const { longitude, latitude } = value;
  const { email } = req.user;
  const driver = await Driver.findOneAndUpdate(
    { email },
    { location: { type: "Point", coordinates: [longitude, latitude] } },
    { new: true }
  );

  if (!driver) {
    throw new AppError(404, "Not Found", "Driver not found");
    return driver;
  }
};

export default locationService;
