import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { set, connect } from "mongoose";

import { log, error } from "console";

const connectDB = () => {
  set("strictQuery", true);

  connect(process.env.DB_URL, {
    w: "majority",
    journal: true,
    wtimeoutMS: 1000,
  });

  mongoose.connection.on("connected", () => {
    log("DB Connection sucessful!!");
  });

  mongoose.connection.on("error", (err) => {
    error(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    log("DB Disconnected!!");
  });
};

export default connectDB; 
