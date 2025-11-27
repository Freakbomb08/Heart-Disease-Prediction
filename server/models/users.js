import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  githubId: { type: String },
  username: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  avatar: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
