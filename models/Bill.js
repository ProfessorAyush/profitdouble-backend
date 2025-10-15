import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  size: {
    height: { type: Number },
    width: { type: Number },
    depth: { type: Number },
  },
});

const billSchema = new mongoose.Schema({
  items: [billItemSchema],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bill", billSchema);
