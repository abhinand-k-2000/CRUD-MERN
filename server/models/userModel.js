import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    mobile: {
      type: Number,
      // required: true,
    },
    email: {
      type: String,
      unique: true,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
