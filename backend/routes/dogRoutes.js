import express from "express";
import { body } from "express-validator";
import {
  createDog,
  getAllDogs,
  getDogById,
  updateDog,
  deleteDog,
} from "../controllers/dogController.js";
import { protect, admin } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getAllDogs);
router.get("/:id", getDogById);

router.post(
  "/",
  protect,
  admin,
  [
    body("name").notEmpty(),
    body("breed").notEmpty(),
    body("age").isNumeric(),
    body("price").isNumeric(),
    body("image").notEmpty(),
    validateRequest,
  ],
  createDog
);

router.put(
  "/:id",
  protect,
  admin,
  [
    body("name").notEmpty(),
    body("breed").notEmpty(),
    body("age").isNumeric(),
    body("price").isNumeric(),
    body("image").notEmpty(),
    validateRequest,
  ],
  updateDog
);

router.delete("/:id", protect, admin, deleteDog);

export default router;
