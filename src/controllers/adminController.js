import models from "../models";
const Admin = models.adminModel;
// const { hashPassword, comparePassword } = require("../utils/hash");
import * as utils from "../utils/index.js";
const {hashPassword, comparePassword} = utils.hash

//sign up

const adminSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if a user is already registered in the database
    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    //hash password
    const hashedPassword = await hashPassword(password);

    //replace the plain password with the hash
    req.body.password = hashedPassword;

    const newAdmin = await Admin.create(req.body);

    if (!newAdmin) {
      return res.status(400).json({ error: "Sign up failed" });
    }

    //respond to the front-end with these details

    res.status(201).json({
      AdminDetails: {
        _id: newAdmin._id,
        email: newAdmin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};
