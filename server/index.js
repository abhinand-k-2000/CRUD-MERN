import express from "express"
import dbConnect from "./config/dbConfig.js";
import cors from "cors"
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(cors())

dbConnect();

app.use(express.json())
const port = process.env.PORT || 3000

app.use('/api', userRouter)


app.get('/', (req, res)=> {
    res.send("hey")
}) 


app.listen(port, ()=>{
    console.log(`server listening to http://localhost:${port}`)
})