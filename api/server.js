import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
//MongoDb database
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

app.use("/api/auth", authRoutes);

app.use(errorHandler);
/**
 5. Connect the  database 
 6. create User model
7.create a test api route(routes)
8. create a sign up API route
9. create a sign in API route
10. Create a middleware  and a function to handle possible errors
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`--> Server listening on port ${PORT} ...`);
});
