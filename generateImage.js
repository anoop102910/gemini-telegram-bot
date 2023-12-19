const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const MODEL_NAME = "gemini-pro-vision";
const API_KEY = "AIzaSyD6bNKmf04BqDvt5B_TwOZXSVhmaZI8UPM";

async function generateImage(image, text) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.4,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      inlineData: {
        mimeType: "image/png",
        data: image,
      },
    },
  ];
  console.log(text);
  let prompt = "";
  if (text) {
    prompt = text;
  }
  const result = await model.generateContent([prompt, ...parts], {
    generationConfig,
    safetySettings,
  });
  const response = result.response;
  return response.text();
}
module.exports = generateImage