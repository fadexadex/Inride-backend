import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    enum: ["Point"],
    coordinates: [Number],
  },
});

const Students = mongoose.model("students", studentSchema);

export default Students;
