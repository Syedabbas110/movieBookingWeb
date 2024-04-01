//J52o6wzSLhjdOjyH
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
const app = express();

import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import cors from "cors";
dotenv.config();


 //middlewares
mongoose.connect(`mongodb+srv://syedabbasu:${process.env.MONGODB_PASSWORD}@cluster0.iypgfwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{useNewUrlParser: true,useUnifiedTopology: true})
  .then(() =>
    app.listen(8000, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));
  app.use(cors());
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
  app.use("/movie", movieRouter);
  app.use("/booking", bookingsRouter);
  app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
 