import express from "express";
import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create a new bill for logged-in user
router.post("/", protect, async (req, res) => {
  try {
    const { items } = req.body;

    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required" });
    }

    // Debug: Check if user ID exists (like in your Product route)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("🧾 Creating bill for user:", req.user._id);

    // Update inventory - check products belong to the user
    for (let item of items) {
      // Find product that belongs to the logged-in user (same pattern as Product route)
      const product = await Product.findOne({ _id: item.productId, user: req.user._id });
      
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name || item.productId}` });
      }
      
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    
    // Create bill with user ID (same pattern as Product creation)
    const bill = new Bill({ 
      items, 
      totalAmount, 
      user: req.user._id  // User at Bill level only
    });
    
    await bill.save();
    console.log("✅ Bill created:", bill);

    res.status(201).json({ bill, totalAmount });
  } catch (err) {
    console.error("❌ Error creating bill:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all bills of logged-in user
router.get("/", protect, async (req, res) => {
  try {
    // Verify user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("📋 Fetching bills for user:", req.user._id);

    // Fetch bills for the current user only, sorted by newest first
    const bills = await Bill.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${bills.length} bills for user`);
    
    res.json(bills);
  } catch (err) {
    console.error("❌ Error fetching bills:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
