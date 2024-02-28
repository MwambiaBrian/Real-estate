import express from "express";
import path from "path";

import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
//MongoDb database
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import listingRoutes from "./routes/listing.route.js";
import userRoutes from "./routes/user.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
dotenv.config();
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);
//--------------------------Deployment--------------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello from us");
  });
}

//--------------------------Deployment---------------------------

/**
//  5. Connect the  database 
//  6. create User model
// 7.create a test api route(routes)
// 8. create a sign up API route
// 9. create a sign in API route
// 10. Create a middleware  and a function to handle possible errors
// 19. Create Update User API Route
// 21. Add delete user functionality
// 22. Add Sign Out functionality
// 23. Add create listing API route
// 27. Create get User Listings  API Route
// 30. Create Updating Listing API Route
35. Create Search API Route
43. Deploy on render.
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`--> Server listening on port ${PORT} ...`);
});
app.use(errorHandler);
