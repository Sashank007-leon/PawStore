import express from "express";
import { body } from "express-validator";
import {
  createAccessory,
  deleteAccessory,
  getAccessoryById,
  getAllAccessories,
  updateAccessory,
} from "../controllers/accessoryController.js";
import { admin, protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getAllAccessories);
router.get("/:id", getAccessoryById);

router.post(
  "/",
  protect,
  admin,
  [
    body("name").notEmpty(),
    body("price").isNumeric(),
    body("image").notEmpty(),
    validateRequest,
  ],
  createAccessory
);

router.put(
  "/:id",
  protect,
  admin,
  [
    body("name").notEmpty(),
    body("price").isNumeric(),
    body("image").notEmpty(),
    validateRequest,
  ],
  updateAccessory
);
router.delete("/:id", protect, admin, deleteAccessory);

export default router;
