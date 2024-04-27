import Admin from "../models/adminModel.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import cloudinary from "../utils/cloudinary.js"


export const adminLogin = async (req, res) =>{
   
    const {email, password} = req.body.data;
    console.log(email, password)

    const adminData = await Admin.findOne({email: email});
    console.log("admin", adminData)
    if(!adminData){
        return res.status(404).json({success: false, message: "Admin not found!"})
    }

    if(adminData.password === password){
        const adminToken = jwt.sign({adminId: adminData._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(200).json({success: true, adminToken, adminId: adminData._id});
    }else{
        return res.status(401).json({success: false, message: "Invalid Credentials"})
    }

}    

export const editUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: "olympic_flag",
        });
        console.log(result);
        const imageUrl = result?.url
      
        const {username, email, mobile, password} = req.body 
        
        const existingEmail = await User.findOne({ email: email });
        
        if (existingEmail) {
          console.log("existing email", existingEmail);
          return res
            .status(404)
            .json({ success: false, message: "Email already exists" });
        }
    
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
}