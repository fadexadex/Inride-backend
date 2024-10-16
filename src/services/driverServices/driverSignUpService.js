import * as models from "../../models/index.js";
const { Driver } = models;

import * as middlewares from "../../middlewares/index.js";
const { AppError } = middlewares;

import * as utils from "../../utils/index.js";
const { generateToken } = utils.jwt;
const { hashPassword } = utils.hash;
const { sendSignUpEmail } = utils;
const { driverSignUPValidator } = utils.validator;

const driverSignUpService = async (body) => {
  const { error, value } = driverSignUPValidator.validate(body);
  if (error) {
    throw new AppError("Invalid Request", 400);
  }

  const { email, password } = value;
  const existingUser = await Driver.findOne({ email });

  if (existingUser) {
    throw new AppError("Driver already exists", 400);
  }

  const hashedPassword = await hashPassword(password);
  value.password = hashedPassword;

  const token = generateToken(value);

  const newDriver = await Driver.create(value);

  sendSignUpEmail(email);

  const DriverDetails = {
    id: newDriver._id,
    firstname: newDriver.first_name,
    lastname: newDriver.last_name,
    email: newDriver.email,
    car_type: newDriver.car_type,
    max_passengers: newDriver.max_passengers,
    phone_number: newDriver.phone_number,
    token: token,
  };
  return DriverDetails;
};

export default driverSignUpService;
