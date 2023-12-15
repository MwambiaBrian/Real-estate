import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//MongoDb database
import connectDB from "./config/db.js";

const app = express();
dotenv.config();
connectDB();

/**
 5. Connect to a database container
 6. create User model
7.create a test api route(routes)
8. create a sign up 
9. create a sign in API route
10. Create a middleware  and a function to handle possible errors
 */
