import dotenv from "dotenv";
dotenv.config();

export const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
export const PDF_API_URL = process.env.PDF_API_URL!;
export const PDF_API_KEY = process.env.PDF_API_KEY!;
