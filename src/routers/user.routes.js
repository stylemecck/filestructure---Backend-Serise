import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { uploadAvatarAndCoverImage } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    uploadAvatarAndCoverImage,
    registerUser
);

export default router;
