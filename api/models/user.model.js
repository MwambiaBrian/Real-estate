import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcryptjs.compareSync(password, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = bcryptjs.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("user", userSchema);
export default User;
