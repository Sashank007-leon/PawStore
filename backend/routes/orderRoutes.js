import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// USER: Place a new order
router.post("/", protect, createOrder);

// USER: Get own orders
router.get("/get-orders", protect, getUserOrders);

// ADMIN: Get all orders
router.get("/admin", protect, admin, getAllOrders);

// ADMIN: Update order status
router.patch("/:id/status", protect, admin, updateOrderStatus);

// ADMIN: Delete order
router.delete("/:id", protect, admin, deleteOrder);

export default router;