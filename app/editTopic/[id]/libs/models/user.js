import mongoose from "mongoose";
//import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
   name: { type: String, required: true },
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true }

   
});
   const User = mongoose.models.User || mongoose.model("User", UserSchema);
   export default User;