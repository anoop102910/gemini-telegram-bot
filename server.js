const TelegramBot = require("node-telegram-bot-api");
const generateContent = require("./generateContent");
const axios = require("axios");
const generateImage = require("./generateImage");


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

bot.on("photo", async msg => {
  const chatId = msg.chat.id;
  const photoId = msg.photo[0].file_id;

  const fileDetails = await bot.getFile(photoId);

  const photoUrl = `https://api.telegram.org/file/bot${process.env.TEGEGRAM_BOT_API}/${fileDetails.file_path}`;

  const response = await axios({
    method: "get",
    url: photoUrl,
    responseType: "arraybuffer",
  });
  const photoBase64 = Buffer.from(response.data, "binary").toString("base64");
  const botResponse = await generateImage(
    photoBase64,
    msg.caption || "tell me somthing regarding this image"
  );
  bot.sendMessage(chatId, botResponse);
});
