import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Sale", saleSchema);
