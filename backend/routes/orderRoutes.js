const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Customer routes
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

// Admin routes
router.get("/all", protect, admin, getAllOrders);
router.patch("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;