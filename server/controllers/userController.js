import { isValidObjectId } from "mongoose";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import cloudinary from "../utils/cloudinary.js";

export const createUser = async (req, res) => {    
  
  // console.log("Cloudinary", cloudinary)

    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: "olympic_flag",
    });
    console.log(result);
    const imageUrl = result?.url

 
  try {
    const { username, mobile, email, password } = req.body

    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, messsge: "Insufficient data" });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      console.log("existing email", existingEmail);
      return res
        .status(404)
        .json({ success: false, message: "Email already exists" });
    }

    console.log("url", imageUrl)
    const newUser = new User({
      name: username,
      mobile, 
      email,
      password,
      image: result.url
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


export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body.data;
    const userData = await User.findOne({email: email});
    if(userData){
      if(password === userData.password){
        const token = jwt.sign({userId: userData._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({success: true, message: "User Logged in successfully", token, userId: userData._id})
      }else {
        return res.status(404).json({success: false, message: "Incorrect Password"})
      }
    }else {
      return res.status(404).json({success: false, message: "User not found"})
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: "Internal server errror"})
  }
}

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

export const getUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const userData = await User.findById(userId)
    if(userData){
      return res.status(200).json({success: true, userData})
    }else {
      return res.status(404).json({success: false, message: "User not found!"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Internal server error"})
  }
}

export const updateUser = async (req, res) => {
  console.log("jslejl")
  try {
    const { userId } = req.params;
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: "olympic_flag",
    });

    console.log(result);
    const imageUrl = result?.url
  
    const {username, email, mobile, password} = req.body   

    const userData = await User.findByIdAndUpdate(userId, {
      name: username,
      email,
      mobile,
      password,
      image: result.url
    })

    if(!userData){
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User data updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
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
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
