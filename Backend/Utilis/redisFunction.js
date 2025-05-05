import logger from '../Logger/logger.js'
import redisClient from '../Middleware/Redis/redisClient.js'
const CHAR_TTL = 60 * 60
export const cacheSet = async (key, value) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: CHAR_TTL })
    logger.info(`Redis SET ${key}`)
  } catch (err) {
    logger.error(`Redis SET failed for ${key}: ${err.message}`)
  }
}

export const cacheGet=async (key)=> {
  try {
    const data = await redisClient.get(key)
    if (data) {
      logger.info(`Redis HIT ${key}`)
      return JSON.parse(data)
    }
  } catch (err) {
    logger.error(`Redis GET failed for ${key}: ${err.message}`)
  }
  return null
}

export const cacheDel = async (...keys) => {
  try {
    await redisClient.del(keys)
    logger.info(`Redis DEL [${keys.join(', ')}]`)
  } catch (err) {
    logger.error(`Redis DEL failed for [${keys.join(', ')}]: ${err.message}`)
  }
}
