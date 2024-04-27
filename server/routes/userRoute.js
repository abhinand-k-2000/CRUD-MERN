
import express from "express"
const userRouter = express.Router()  
import multer from "multer"
import path from "path"
import {createUser, getUsers, updateUser, deleteUser, loginUser, getUser} from "../controllers/userController.js"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
const upload = multer({ storage: storage });


userRouter.post('/createUser', upload.single('image'), createUser)
userRouter.post('/login', loginUser)

userRouter.get('/getUsers', getUsers)
userRouter.get('/getUser/:userId', getUser)

userRouter.put('/updateUser/:userId', upload.single('image'), updateUser)
userRouter.delete('/deleteUser/:userId', deleteUser)


export default userRouter