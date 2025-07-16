// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})


connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((Err)=>{
    console.log("Monogo DB connection failed !!", Err);
})











/*
import express from "express";
const app = express();

( async () =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // database connect
        app.on("error", (error) => {
            console.error("ERROR: ", error  )
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    } catch (error){
        console.error("ERROR: ", error  )
        throw error
    }
}) () */