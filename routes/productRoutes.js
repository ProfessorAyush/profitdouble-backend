import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all products of logged-in user
router.get("/", protect, async (req, res) => {
  try {
    // Debug: Check if user ID exists
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("🔍 Fetching products for user:", req.user._id);
    
    // Filter products by user ID
    const products = await Product.find({ user: req.user._id });
    
    console.log(`✅ Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
});

// Add new product for logged-in user
router.post("/", protect, async (req, res) => {
  try {
    const { name, brand, costPrice, sellingPrice, quantity, size, description } = req.body;
    console.log("🛒 Adding product for user:", req.user._id,req.user);
    const product = new Product({
      name,
      brand,
      costPrice,
      sellingPrice,
      quantity,
      size,
      description,
      user: req.user._id
    });

    await product.save();
    console.log("✅ Product added:", product);
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    return res.status(500).json({ message: err.message });
  }
});

// Update product
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
