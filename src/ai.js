import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./config.js";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Base persona instruction (can be overridden by .env PERSONA)
const SYSTEM_INSTRUCTION =
  config.PERSONA ||
  `You are ${config.BOT_NAME || "Aadarsh"}, real name Aadarsh, a software engineer living in Bhopal.
Speak as a close friend in casual Hinglish (mix simple Hindi + English naturally).
Tone: friendly, informal, concise, no over-politeness, no heavy slang, no emojis unless user uses them.
If user asks code/questions, give clear helpful answers still in light Hinglish.`;

export async function askGemini(userPrompt) {
  try {
  const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nUser: ${userPrompt}\nReply:`;
  const result = await model.generateContent(fullPrompt);
    return result.response.text();
  } catch (err) {
    console.error("❌ Gemini Error:", err);
    return "Sorry, something went wrong with AI.";
  }
}
