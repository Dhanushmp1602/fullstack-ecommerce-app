const Order = require("../models/Order");

// @desc Place a new order
// @route POST /api/orders
exports.placeOrder = async (req, res) => {
  const { firstName, lastName, address, items } = req.body || {};

  if (!firstName || !lastName || !address) {
    return res.status(400).json({ error: "firstName, lastName, and address are required." });
  }

  try {
    const order = new Order({ firstName, lastName, address, items });
    await order.save();

    console.log("✅ Order saved:", order._id);
    res.json({ message: "Order placed successfully.", orderId: order._id });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Get all orders
// @route GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
