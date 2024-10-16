import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
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
  car_type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  max_passengers: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  verificationStatus: {
    type: String,
    enum: ["Verified", "Unverified", "Awaiting Verification"],
    default: "Unverified",
  },
  current_passengers: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  driver_license: {
    type: String,
    default: "",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // Default coordinates (longitude, latitude)
    },
  },
});

driverSchema.index({ location: "2dsphere" });

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
