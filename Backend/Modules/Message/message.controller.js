import OpenAI from 'openai'
import logger from '../../Logger/logger.js'
import character from '../Character/character.model.js'
import messageModel from './message.model.js'
import { loadHistory, saveMessage } from './message.service.js'

export const chatWithCharacter = async (req, res, next) => {
  try {
    const { characterId, userMessage } = req.body
    const char = await character.findOne({ _id: characterId })
    if (!char) return res.status(404).json({ error: 'Character not found' })

    // Build system prompt using backstory only
    const systemMessage = {
      role: 'system',
      content: `You are ${char.name} from Rick & Morty. Backstory: ${
        char.backstory || 'None'
      }. Always stay in character and follow their speech patterns and personality.`
    }

    const history = await loadHistory(characterId)
    const messages = [
      systemMessage,
      ...history,
      { role: 'user', content: userMessage }
    ]

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      // apiKey: process.env.OPENAI_API_KEY,   // or however you configure your key
      apiKey:'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',

    });

    const stream = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1-distill-qwen-32b:free',
      messages,
      stream: true
    })

    res.setHeader('Content-Type', 'text/event-stream')
    let assistantReply = ''

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || ''
      assistantReply += text
      res.write(text)
    }
    res.end()
    await saveMessage(characterId, 'user', userMessage)
    await saveMessage(characterId, 'assistant', assistantReply)
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}

export const getCharacterChat = async (req, res, next) => {
  try {
    const { characterId } = req.params

    const messages = await messageModel
      .find({ characterId })
      .sort({ createdAt: 1 })
      .lean()

    res.status(200).json({
      status: 'success',
      message: 'Messages fetched successfully',
      data: messages
    })
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
}
