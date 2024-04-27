import express from "express"
import dbConnect from "./config/dbConfig.js";
import cors from "cors"
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

dbConnect();


const port = process.env.PORT || 3000

app.use('/api', userRouter)
app.use('/api', adminRouter)  
 


app.get('/', (req, res)=> {
    res.send("hey")
}) 


app.listen(port, ()=>{
    console.log(`server listening to http://localhost:${port}`)
})