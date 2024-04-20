
import express from "express"
const userRouter = express.Router()
import {createUser, getUsers, updateUser, deleteUser} from "../controllers/userController.js"


userRouter.post('/createUser', createUser)
userRouter.get('/getUsers', getUsers)
userRouter.put('/updateUser/:userId', updateUser)
userRouter.delete('/deleteUser/:userId', deleteUser)


export default userRouter