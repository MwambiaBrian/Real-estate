import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";
import User from "../models/user.model.js";

const signup = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new Error("Request body is undefined");
  }
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.send(400);
    throw new Error("Please fill all the fields");
  }
  //check if the user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create({ username, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

export { signup };
