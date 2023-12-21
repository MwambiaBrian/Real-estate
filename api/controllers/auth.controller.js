import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";
import User from "../models/user.model.js";

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
  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Sign in the user");
  }
});

export { signup, signin };
