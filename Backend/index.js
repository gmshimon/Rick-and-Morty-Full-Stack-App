import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import path from 'path'
import fs from 'fs'
import morganMiddleware from "./Middleware/loggerMiddleware.js";
import globalErrorHandler from "./Middleware/globalErrorMiddleware.js";


dotenv.config();

const port = process.env.PORT || 8000
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json())
app.use(bodyParser.json());
app.use(globalErrorHandler)
app.use(morganMiddleware)
// const uri = process.env.MONGODB_API_KEY
const uri = 'mongodb://localhost:27017/e-recruitment'
mongoose.connect(uri).then(()=>{
    console.log("Connected to MongoDB")
})

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

export default app;