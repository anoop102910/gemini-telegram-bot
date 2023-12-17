const TelegramBot = require("node-telegram-bot-api");
const generateContent = require("./generateContent");
const getImageBase64 = require("./getImageBase64");
require("dotenv").config();
const bot = new TelegramBot(process.env.TEGEGRAM_BOT_API, { polling: true });

bot.on("text", async msg => {
  const chatId = msg.chat.id;
  try {
    const response = await generateContent(msg.text);
    bot.sendMessage(chatId, response);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "Something went wrong");
  }
});

// bot.on("photo", async msg => {
//   const chatId = msg.chat.id;
//   try {
//     const image = msg.photo;
//     const largestPhoto = image[1];
//     console.log(largestPhoto.file_id)
//     const file = await bot.downloadFile(largestPhoto.file_id);
//   } catch (error) {
//     console.log(error);
//   }
// });
