import express from "express";
import { body } from "express-validator";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect, admin } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.post(
  "/",
  protect,
  admin,
  [body("title").notEmpty(), body("content").notEmpty(), validateRequest],
  createBlog
);

router.put(
  "/:id",
  protect,
  admin,
  [body("title").notEmpty(), body("content").notEmpty(), validateRequest],
  updateBlog
);
router.delete("/:id", protect, admin, deleteBlog);

export default router;
