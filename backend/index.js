import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import userRoute from "./routes/userRoute.js";


dotenv.config({
    
    path: '.env'
})

databaseConnection();
const app = express();


app.use(express.urlencoded({
    extends: true
}));
app.use(express.json());
app.use(cookieParser());



app.use("/api/v1/user/", userRoute);
app.get("/home", (req,res)=>{
    req.status(200).json({
        message:"coming from backend..."
    })
})




app.listen(process.env.PORT, ()=>{
    console.log(`Server listen at port ${process.env.PORT}`);
}) 