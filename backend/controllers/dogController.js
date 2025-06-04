import Dog from "../models/Dog.js";
import { validationResult } from "express-validator";
import cloudinary from "../config/cloudinary.js";
import { extractPublicId } from "../utils/extractPublicId.js";

export const createDog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const dog = await Dog.create(req.body);
    res.status(201).json(dog);
  } catch (err) {
    console.error("Create Dog Error:", err);
    res.status(500).json({ message: "Failed to create dog" });
  }
};

export const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find().sort({ createdAt: -1 });
    res.json(dogs);
  } catch (err) {
    console.error("Get All Dogs Error:", err);
    res.status(500).json({ message: "Failed to fetch dogs" });
  }
};

export const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: "Dog not found" });
    res.json(dog);
  } catch (err) {
    console.error("Get Dog By ID Error:", err);
    res.status(500).json({ message: "Error fetching dog" });
  }
};

export const updateDog = async (req, res) => {
  try {
    const existing = await Dog.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Dog not found" });

    if (req.body.image && req.body.image !== existing.image) {
      const publicId = extractPublicId(existing.image);
      await cloudinary.uploader.destroy(publicId);
    }

    const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dog);
  } catch (err) {
    console.error("Update Dog Error:", err);
    res.status(500).json({ message: "Failed to update dog" });
  }
};

export const deleteDog = async (req, res) => {
  try {
    const deleted = await Dog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Dog not found" });

    const publicId = extractPublicId(deleted.image);
    await cloudinary.uploader.destroy(publicId);

    res.json({ message: "Dog deleted" });
  } catch (err) {
    console.error("Delete Dog Error:", err);
    res.status(500).json({ message: "Failed to delete dog" });
  }
};