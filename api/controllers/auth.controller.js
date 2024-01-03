import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
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
      avatar: newUser.avatar,
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
    throw new Error("User not found");
  }

  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true, sameSite: "Lax" })
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
  } else {
    res.status(400);
    throw new Error("Wrong Credentials");
  }
});
const google = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.status(200);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
      res.cookie("access_token", token, { httpOnly: true, sameSite: "Lax" });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("failed to complete with google");
  }
});
const signout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has logged out");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
export { signup, signin, google, signout };
