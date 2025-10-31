import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Connect MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
import productRoutes from "./routes/productRoutes.js";
import saleRoutes from "./routes/salesRoutes.js";
import billingRoutes from "./routes/billingRoutes.js"
import authRoutes from "./routes/authRoutes.js"


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/bills", billingRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
