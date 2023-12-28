import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized!");
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      res.status(403);
      throw new Error("Forbidden");
    }
    req.user = user;
    next();
  });
});
