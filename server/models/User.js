import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: String,
  dob: Date,
  gender: String,
  address: String,
  country: String,
});
userSchema.pre('save', async function (next) {
  if (this.isNew && this.password) {
    const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

let User = mongoose.model("User", userSchema);
export default User;

