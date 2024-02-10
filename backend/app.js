import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import createError from "http-errors";
import bodyParser from "body-parser";
//Routes imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import carRoutes from "./routes/car.js";

//create the server
const app = express();
const PORT = process.env.PORT || 4000;
const DB = process.env.DB;

//register middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//connect to mongo database
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Listening on localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/car", carRoutes);

app.use((req, res, next) => {
  next(createError.NotFound());
});

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: errorMessage,
    },
  });
});
