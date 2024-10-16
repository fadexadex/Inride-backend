import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/dbconfig.js";
import cors from "cors";
import * as Routes from "./routes/index.js";
const { driverRoutes, studentRoutes } = Routes;

import * as middlewares from "./middlewares/index.js";
const { errorHandler} = middlewares;

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/v1", driverRoutes);
app.use("/api/v1", studentRoutes);

app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Sever listening on ${port}`);
});
