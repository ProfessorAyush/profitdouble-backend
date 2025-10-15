
import express from "express";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
const router = express.Router();

// Create sale
router.post("/", async (req, res) => {
  const { items } = req.body;
  let total = 0;
  for (let item of items) total += item.quantity * item.price;

  const sale = new Sale({ items, total });
  await sale.save();

  // Update inventory
  for (let item of items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { quantity: -item.quantity },
    });
  }

  res.json(sale);
});

// Get all sales
router.get("/", async (req, res) => {
  const sales = await Sale.find().populate("items.productId");
  res.json(sales);
});

export default router;
