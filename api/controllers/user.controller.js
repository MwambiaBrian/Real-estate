import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    res.status(401);
    throw new Error("You can only update your own account");
  }
  // console.log(req.user.id);
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const user = await User.findById("658d3a2c29ec13f1ad3b6e12");
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    console.log(user);
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
