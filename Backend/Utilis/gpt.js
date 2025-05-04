// fetchGPT.js
import OpenAI from 'openai'

export const fetchGPT = (messages) => {
  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENAI_API_KEY
  })
  // return the async-iterable directly
  return openai.chat.completions.create({
    model: 'deepseek/deepseek-r1-distill-qwen-32b:free',
    messages,
    stream: true
  })
}

