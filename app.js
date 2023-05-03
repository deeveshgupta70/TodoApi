import express from "express"
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { User } from "./models/user.js ";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"; 
dotenv.config({
    path:"./config.env"
});


export const app = express();


//Using Middleware
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)

app.get("/" , (req,res)=>{
    res.send('<h1>Hello Sir</h1>')
})


//Error Middleware
app.use(errorMiddleware);
