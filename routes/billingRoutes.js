import express from "express";
import Bill from "../models/Bill.js";
import Product from "../models/Product.js";

const router = express.Router();

// Create a new bill
router.post("/", async (req, res) => {
  try {
    const { items } = req.body; // array of {productId, quantity, price}

    // Update inventory
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (product.quantity < item.quantity) return res.status(400).json({ message: `Not enough stock for ${product.name}` });

      product.quantity -= item.quantity;
      await product.save();
    }

    const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const bill = new Bill({ items, totalAmount });
    await bill.save();

    res.status(201).json({ bill, totalAmount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 });
  res.json(bills);
});

export default router;
