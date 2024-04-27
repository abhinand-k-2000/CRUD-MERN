
import express from "express"
import multer from "multer";
import path from "path"
const adminRouter = express.Router()

import {adminLogin, editUser} from "../controllers/adminController.js"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });

const upload = multer({ storage: storage });
adminRouter.post('/adminLogin', adminLogin)

adminRouter.put('/admin/editUser/:userId', upload.single('image'),  editUser)



export default adminRouter