import Blog from "../models/Blog.js";
import { validationResult } from "express-validator";
import cloudinary from "../config/cloudinary.js";
import { extractPublicId } from "../utils/extractPublicId.js";

export const createBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("Get Blogs Error:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error("Get Blog By ID Error:", err);
    res.status(500).json({ message: "Error fetching blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const existing = await Blog.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Blog not found" });

    if (req.body.image && req.body.image !== existing.image) {
      const publicId = extractPublicId(existing.image);
      await cloudinary.uploader.destroy(publicId);
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    const publicId = extractPublicId(deleted.image);
    await cloudinary.uploader.destroy(publicId);

    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};