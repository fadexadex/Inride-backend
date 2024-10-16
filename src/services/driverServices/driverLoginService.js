import * as utils from "../../utils/index.js";
const { comparePassword } = utils.hash;
const { generateToken } = utils.jwt;
const { logInValidator } = utils.validator;

import * as middlewares from "../../middlewares/index.js";
const { AppError } = middlewares;

import * as models from "../../models/index.js";
const { Driver } = models;

const driverLoginService = async (body) => {
  const { error, value } = logInValidator.validate(body);
  if (error) {
   throw new AppError("Invalid Request", 400);
  }

  const { email, password } = value;

  const driver = await Driver.findOne({ email });

  if (!driver) {
    throw new AppError("Invalid Credentials", 401);
  }

  const isPasswordValid = await comparePassword(password, driver.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid Credentials", 401);
  }

  const token = generateToken(value);

  const DriverDetails = {
    id: driver._id,
    firstname: driver.first_name,
    lastname: driver.last_name,
    email: driver.email,
    car_type: driver.car_type,
    max_passengers: driver.max_passengers,
    phone_number: driver.phone_number,
    token: token,
  };

  return DriverDetails;
};

export default driverLoginService;
