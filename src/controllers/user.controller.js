import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error){
        throw new ApiError(500, "Something went wrong while generating token refresh and access token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from forntend
  // validation - not empty
  // check if user already exist: usename or email
  // check for images, check for avatar
  // upload them to cloudinary avtar
  // create user object -- create enrty in database
  // remove password and response token form response
  // check for user creation
  // return response

  const { fullName, username, email, password } = req.body;
  console.log("email: ", email);

  // if(fullName ===""){
  //     throw new ApiError(400, "Full name is required");
  // } // multlipule if else bhi use kar sakte hai

  // if ([fullName, username, email, password].includes("")) {
  //     throw new ApiError(400, "All fields are required");
  // } // aise bhi use hota hai, includes return karta hai true or false

  if (
    [fullName, username, email, password].some((Field) => Field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log("existingUser: ", existingUser);
  if (existingUser) {
    throw new ApiError(409, "User already exist");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  }

  console.log("req.files: ", req.files);
  console.log("req.body: ", req.body);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avtar file is required local path");
  }

  console.log("Uploading avatar from path:", avatarLocalPath);
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  console.log("Cloudinary upload result:", avatar);

  if (!avatar) {
    throw new ApiError(400, "Avtar file is required clode");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //user creationa and data base entry
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong - while regestring the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registred sucessfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req.body -> se data lao
  // username or email
  // find the user
  // check password
  // access and refresh token gnerate
  // send cookie
  // send response

  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const {refreshToken, accessToken} = await generateAccessTokenAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
        200, // status (util me phle se hi ApiResponse banaye hue the )
        {
            user: loggedInUser, accessToken, refreshToken // data
        },
        "User logged In Sucessfully" //message
    )
  )

});

const logoutUser = asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
      req.user._id,{
        $set: {
          refreshToken: undefined
        }
      },
      {
        new: true
      }
    )

    const options ={
      httpOnly: true,
      secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200, {}, "User logged Out"))
})

export { registerUser, loginUser, logoutUser };
