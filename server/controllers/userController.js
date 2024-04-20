import { isValidObjectId } from "mongoose";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    const newUser = new User({
      name,
      mobile,
      email,
      password,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "User creation failed" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    res
      .status(200)
      .json({ success: true, message: "List of users", usersList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User data updated", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if(!isValidObjectId(userId)) {
        return res.status(400).json({success: false, message: "Invalid User ID"})
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Internal server error"})
  }
};  
