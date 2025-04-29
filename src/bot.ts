import TelegramBot from "node-telegram-bot-api";
import { BOT_TOKEN } from "./config";
import { generatePDF } from "./api";
import { downloadFile, deleteFile, isValidUrl } from "./utils";

// Initialize the bot
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/https?:\/\/\S+/, async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match?.[0];

  if (!url || !isValidUrl(url)) {
    return bot.sendMessage(chatId, "Please send a valid URL.");
  }

  try {
    await bot.sendMessage(chatId, "Generating your PDF, please wait...");

    const pdfUrl = await generatePDF(url);

    const filePath = await downloadFile(pdfUrl);

    await bot.sendDocument(chatId, filePath, {
      caption: "Here is your PDF! 📄",
    });

    deleteFile(filePath);

  } catch (err) {
    console.error("[Error]", err);
    bot.sendMessage(chatId, "Sorry, something went wrong while processing your request.");
  }
});

bot.on("message", (msg) => {
  if (!msg.text?.match(/https?:\/\/\S+/)) {
    bot.sendMessage(msg.chat.id, "Please send me a URL to convert it to PDF.");
  }
});
