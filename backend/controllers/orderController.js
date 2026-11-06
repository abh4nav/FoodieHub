const Order = require("../models/Order");
const Food = require("../models/Food");

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, phone } = req.body;

    // Validate required fields
    if (!items || items.length === 0 || !deliveryAddress || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide items, delivery address and phone number",
      });
    }

    // Verify food items and calculate total on the server
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      if (!item.foodId || !Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid food item or quantity",
        });
      }

      const food = await Food.findById(item.foodId);

      if (!food || !food.isAvailable) {
        return res.status(400).json({
          success: false,
          message: "One or more food items are unavailable",
        });
      }

      totalAmount += food.price * item.quantity;

      orderItems.push({
        food: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      phone,
      paymentMethod: "COD",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get orders of logged-in customer
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Admin: Get all customer orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Placed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    // Validate the new status
    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    ).populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = { placeOrder, getMyOrders,  getAllOrders, updateOrderStatus,};