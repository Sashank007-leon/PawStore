import Accessory from "../models/Accessory.js";
import { validationResult } from "express-validator";
import cloudinary from "../config/cloudinary.js";
import { extractPublicId } from "../utils/extractPublicId.js";

export const createAccessory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { name, category, price, description, image, stock } = req.body;

    if (stock == null || stock < 0) {
      return res.status(400).json({ message: "Stock must be a non-negative number" });
    }

    const accessory = await Accessory.create({
      name,
      category,
      price,
      description,
      image,
      stock,
    });

    res.status(201).json(accessory);
  } catch (err) {
    console.error("Create Accessory Error:", err);
    res.status(500).json({ message: "Failed to create accessory" });
  }
};

export const getAllAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find().sort({ createdAt: -1 });
    res.json(accessories);
  } catch (err) {
    console.error("Get All Accessories Error:", err);
    res.status(500).json({ message: "Failed to fetch accessories" });
  }
};

export const getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ message: "Accessory not found" });
    res.json(accessory);
  } catch (err) {
    console.error("Get Accessory By ID Error:", err);
    res.status(500).json({ message: "Error fetching accessory" });
  }
};

export const updateAccessory = async (req, res) => {
  try {
    const existing = await Accessory.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Accessory not found" });

    if (req.body.image && req.body.image !== existing.image) {
      const publicId = extractPublicId(existing.image);
      await cloudinary.uploader.destroy(publicId);
    }

    const updatedData = req.body;

    if (updatedData.stock != null && updatedData.stock < 0) {
      return res.status(400).json({ message: "Stock must be a non-negative number" });
    }

    const accessory = await Accessory.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.json(accessory);
  } catch (err) {
    console.error("Update Accessory Error:", err);
    res.status(500).json({ message: "Failed to update accessory" });
  }
};

export const deleteAccessory = async (req, res) => {
  try {
    const deleted = await Accessory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Accessory not found" });

    const publicId = extractPublicId(deleted.image);
    await cloudinary.uploader.destroy(publicId);

    res.json({ message: "Accessory deleted" });
  } catch (err) {
    console.error("Delete Accessory Error:", err);
    res.status(500).json({ message: "Failed to delete accessory" });
  }
};