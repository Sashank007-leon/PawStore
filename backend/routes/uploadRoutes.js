import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pawstore",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

router.post("/", protect, admin, upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      imageUrl: req.file.path, 
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
