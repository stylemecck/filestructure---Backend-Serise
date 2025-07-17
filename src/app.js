import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"})) //josn data lene ke liye use hota hai
app.use(express.urlencoded({extended: true, limit: "20kb"})) //url se data lene ke samye url ko samjhne ke liye use hota hai jaise  bhu jagh sapce ko + kar deta kahi pe %20 kar deta hai
app.use(express.static('public')) //static file lene ke liye use hota hai
app.use(cookieParser()) // ye use hota hai user ke browser me cookie store kar sake aur uska use kar sake ye secure hota hai, aur usko shir wahi database access kar sakra hai.


//Routes
import userRoute from "./routers/user.routes.js"


//routes declearation 
app.use("/api/v1/users", userRoute) //https://localhost:8000/api/v1/users/register

export { app }