// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/product");

// Place order
router.post("/", async (req, res) => {
  const { firstName, lastName, address, items } = req.body;

  if (!firstName || !lastName || !address || !items || items.length === 0) {
    return res.status(400).json({ error: "All fields and items are required" });
  }

  try {
    // validate products exist
    for (const i of items) {
      const product = await Product.findById(i.productId);
      if (!product) return res.status(404).json({ error: `Product not found: ${i.productId}` });
    }

    const order = new Order({
      firstName,
      lastName,
      address,
      items: items.map((i) => ({
        product: i.productId,
        quantity: i.quantity,
      })),
    });

    await order.save();
    res.json({ message: "✅ Order placed successfully", orderId: order._id });
  } catch (err) {
    console.error("❌ Order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all orders (Admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product") // 👈 get full product details
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
