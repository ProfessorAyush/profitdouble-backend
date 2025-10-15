import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  costPrice: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
});

export default mongoose.model("Product", productSchema);
