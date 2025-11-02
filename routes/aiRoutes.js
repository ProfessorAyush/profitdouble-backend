import express from "express";
import { protect } from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/chat", protect, async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await aiResponse.json(); // ✅ parse to JSON

    res.status(200).json({ response: data });
  } catch (error) {
    res.status(500).json({
      message: "AI response generation failed",
      error: error.message,
    });
  }
});

export default router;
