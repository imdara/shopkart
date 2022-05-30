import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  address: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
