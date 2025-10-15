import express from "express";
import Product from "../models/Product.js";
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add new product
router.post("/", async (req, res) => {
  const { name, costPrice, sellPrice, quantity } = req.body;
  const newProduct = new Product({ name, costPrice, sellPrice, quantity });
  await newProduct.save();
  res.json(newProduct);
});

// Update product
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;
