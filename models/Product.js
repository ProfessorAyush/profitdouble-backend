import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  costPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: {                        // optional
    height: { type: Number },
    width: { type: Number },
    depth: { type: Number }
  },
  description: { type: String }, // optional
}, { timestamps: true });


export default mongoose.model("Product", productSchema);
