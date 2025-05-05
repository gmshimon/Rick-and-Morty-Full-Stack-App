import logger from '../../Logger/logger.js'
import character from '../Character/character.model.js'
import messageModel from './message.model.js'
import { loadHistory, saveMessage } from './message.service.js'
import { fetchGPT } from '../../Utilis/gpt.js'
import { cacheDel, cacheGet, cacheSet } from '../../Utilis/redisFunction.js'

export const chatWithCharacter = async (req, res, next) => {
  try {
    const { characterId, userMessage } = req.body
    const historyKey = `chat:history:character:${characterId}`

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

    const stream = await fetchGPT(messages)

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
    await cacheDel(historyKey)
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}

export const getCharacterChat = async (req, res, next) => {
  try {
    const { characterId } = req.params
    const historyKey = `chat:history:character:${characterId}`

    let messages = await cacheGet(historyKey)
    if (!messages) {
      messages = await messageModel
        .find({ characterId })
        .sort({ createdAt: 1 })
        .lean()
      await cacheSet(historyKey, messages)
    }

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
