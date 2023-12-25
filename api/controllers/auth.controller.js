import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const signup = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new Error("Request body is undefined");
  }
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  //console.log(email);
  //check if the user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const nameUsed = await User.findOne({ username });

  if (nameUsed) {
    res.status(400);
    throw new Error("Username already exist");
  }
  const newUser = await User.create({ username, email, password });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not Exist");
  }
  const validCredentials = user.comparePassword(password);
  if (!validCredentials) {
    res.status(400);
    throw new Error("Wrong Credentials");
  }
  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        email: user.email,
      })
      .send();
  } else {
    res.status(400);
    throw new Error("Failed to Sign in the user");
  }
});

export { signup, signin };
