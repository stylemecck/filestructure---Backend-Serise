import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// 👇 Configure the middleware for your use case,
// so `req.files` will be populated as desired.
export const uploadAvatarAndCoverImage = multer({ storage }).fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverImage", maxCount: 1 }
]);

// ⚠️ DO NOT export the plain instance! Use a defined middleware.
// export const upload = multer({ storage }); // WRONG for this use
