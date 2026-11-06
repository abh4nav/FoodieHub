
const express = require("express");
const router = express.Router();

const { getFoods, createFood, updateFood, deleteFood } = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/", getFoods);

// Only logged-in admins can add food
router.post("/", protect, admin, createFood);
// Only admins can update food
router.put("/:id", protect, admin, updateFood);
// Only admins can delete food
router.delete("/:id", protect, admin, deleteFood);

module.exports = router;
