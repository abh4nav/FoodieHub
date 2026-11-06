
const Food = require("../models/Food");
const Order = require("../models/Order");

const getAdminDashboard = async (req, res) => {
  try {
    // Count total food items
    const totalFoods = await Food.countDocuments();

    // Count total orders
    const totalOrders = await Order.countDocuments();

    // Count orders that are not yet delivered or cancelled
    const pendingOrders = await Order.countDocuments({
      orderStatus: {
        $nin: ["Delivered", "Cancelled"],
      },
    });

    // Calculate total revenue from orders
    const revenueResult = await Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      admin: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
      stats: {
        totalFoods,
        totalOrders,
        pendingOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAdminDashboard };
