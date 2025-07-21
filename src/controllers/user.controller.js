import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) =>{
        //get user details from forntend
        // validation - not empty
        // check if user already exist: usename or email
        // check for images, check for avatar
        // upload them to cloudinary avtar
        // create user object -- create enrty in database
        // remove password and response token form response
        // check for user creation
        // return response

        const {fullName, username, email, password} = req.body
        console.log("email: ", email);

        // if(fullName ===""){
        //     throw new ApiError(400, "Full name is required");
        // } // multlipule if else bhi use kar sakte hai
     
        // if ([fullName, username, email, password].includes("")) {
        //     throw new ApiError(400, "All fields are required"); 
        // } // aise bhi use hota hai, includes return karta hai true or false

        if(
            [fullName, username, email, password].some((Field) => Field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser =  User.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        console.log("existingUser: ", existingUser);
        if (existingUser) {
            throw new ApiError(409, "User already exist");
        }
        
        const avatarLocalPath = req.files?.avatar[0]?.path
        // console.log ("avatar: ", avatar);
        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if(!avatarLocalPath) {
            throw new ApiError(400, "Avtar file is required")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
            throw new ApiError(400, "Avtar file is required")
        }
        //user creationa and data base entry
        const user = await User.create(
            {
                fullName,
                avatar: avatar.url,
                coverImage: coverImage?.url || "",
                email,
                password,
                username: username.toLowerCase()
            }
        )
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500, "Something went wrong - while regestring the user")
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registred sucessfully")
        )
        
})

export {registerUser}