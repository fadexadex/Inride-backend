import mongoose from "mongoose";


const locationSchema = new mongoose.Schema({
  location_name: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: String,
    required: true,
  },
});

const Locations = mongoose.model("locations", locationSchema);

export default Locations;
