import * as models from "../../models/index.js";
const { Students } = models;

import * as utils from "../../utils/index.js";
const { generateToken } = utils.jwt;
const { comparePassword } = utils.hash;
const { logInValidator } = utils.validator;

import * as middlewares from "../../middlewares/index.js";
const { AppError } = middlewares;

const studentLoginService = async (req) => {
  const { error, value } = logInValidator.validate(req.body);
  if (error) {
    throw new AppError("Invalid Request", 400);
  }

  const { email, password } = value;

  const findStudent = await Students.findOne({ email });
  if (!findStudent) {
    throw new AppError("Invalid Credentials", 401);
  }

  const isMatch = await comparePassword(password, findStudent.password);
  if (!isMatch) {
    throw new AppError("Invalid Credentials", 401);
  }

  const token = generateToken(value);

  const StudentDetails = {
    _id: findStudent._id,
    firstname: findStudent.first_name,
    lastname: findStudent.last_name,
    email: findStudent.email,
    token: token,
    ImageUrl: findStudent?.imageUrl || null,
  };

  return StudentDetails;
};

export default studentLoginService;
