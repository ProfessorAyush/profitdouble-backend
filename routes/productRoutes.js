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
  try {
    const { name, brand, costPrice, sellingPrice, quantity, size, description } = req.body;

    const product = new Product({
      name,
      brand,
      costPrice,
      sellingPrice,
      quantity,
      size,        // optional
      description  // optional
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
