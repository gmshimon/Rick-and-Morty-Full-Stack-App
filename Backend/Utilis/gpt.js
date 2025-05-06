// fetchGPT.js
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()
export const fetchGPT = (messages) => {
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
  // return the async-iterable directly
  return openai.chat.completions.create({
    model: 'deepseek/deepseek-r1-distill-qwen-32b:free',
    messages,
    stream: true
  })
}

