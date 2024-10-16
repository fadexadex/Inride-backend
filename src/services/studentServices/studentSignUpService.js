import * as utils from "../../utils/index.js";
const { hashPassword, comparePassword } = utils.hash;
const { studentSignUpValidator } = utils.validator;
const { generateToken } = utils.jwt;
const { sendSignUpEmail } = utils;

import * as middlewares from "../../middlewares/index.js";
const { AppError } = middlewares;

import * as models from "../../models/index.js";
const { Students } = models;

const studentSignUpService = async (req) => {
  const { error, value } = studentSignUpValidator.validate(req.body);
  if (error) {
    throw new AppError("Invalid Request", 400);
  }
  const { email, password } = value;
  const existingUser = await Students.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists, LogIn Instead", 409);
  }

  const hashedPassword = await hashPassword(password);
  value.password = hashedPassword;

  const token = generateToken(value);
  const newStudent = await Students.create(value);
  if (!newStudent) {
    throw new AppError("Sign up failed", 500);
  }

  sendSignUpEmail(email);

  const studentDetails = {
    _id: newStudent._id,
    firstname: newStudent.first_name,
    lastname: newStudent.last_name,
    email: newStudent.email,
    token: token,
  };

  return studentDetails;
};

export default studentSignUpService;
