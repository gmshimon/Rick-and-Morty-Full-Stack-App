import logger from '../../Logger/logger.js'
import { fetchGPT } from '../../Utilis/gpt.js'
import character from '../Character/character.model.js'
import episodes from './episode.model.js'
import { cacheDel } from '../../Utilis/redisFunction.js'

const charKey = id => `character:id:${id}`
const userCharsKey = userId => `character:createdBy:${userId}`

export const generateRecommendations = async (req, res, next) => {
  try {
    const charId = req.params.id

    const characterData = await character.findById(req.params.id)

    if (!characterData) {
      return res.status(404).json({ message: 'Character not found' })
    }

    const traitSummary = Object.entries(characterData.personality)
      .map(([k, v]) => `${k}: ${v.toFixed(2)}`)
      .join(', ')

    const prompt = `
      You are a Rick & Morty expert.  
      Given a character with these trait scores:
      ${traitSummary}
      And this backstory:
      """${characterData.backstory}"""
      
      Recommend three episodes that best illustrate this character’s personality.
      **IMPORTANT**:  
        – Respond with *only* the raw JSON array.  
        – Do *not* include any markdown code fences (no \`\`\`, no \`\`\`json).  
        – Do *not* include any additional text or commentary.
      Example of the exact format I need::
      [
        {
          "code":        "S03E01",                // String
          "title":       "The Rickshank Redemption", // String
          "description": "Rick is imprisoned in a galactic prison …", // String
          "season":      3,                       // Number
          "episode":     1,                       // Number
          "airDate":     "2017-07-30",            // YYYY-MM-DD
          "thumbnail":   "https://…/s03e01.jpg",  // URL String
          "tags":        ["nihilism","science"]   // Array of lowercase strings
        },
        …
      ]
      Make sure it is valid JSON and includes all fields for each episode.
          `.trim()

    const stream = await fetchGPT([
      {
        role: 'system',
        content: 'You are an expert on Rick & Morty episodes.'
      },
      { role: 'user', content: prompt }
    ])

    let full = ''
    for await (const part of stream) {
      const chunk = part.choices?.[0]?.delta?.content
      if (chunk) full += chunk
    }
    let jsonString = full.trim()

    // 1) If it’s wrapped in ```json … ``` grab the inner part
    const fenced = jsonString.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
    if (fenced) {
      jsonString = fenced[1].trim()
    }
    // 2) Remove any stray backticks
    jsonString = jsonString.replace(/```/g, '').trim()
    let recs = JSON.parse(jsonString)
    if (!Array.isArray(recs)) throw new Error('Not an array')

    const episodesData = []
    for (const epData of recs) {
      const ep = await episodes.findOneAndUpdate(
        { code: epData.code },
        {
          // set all episode fields from GPT
          $set: {
            title: epData.title,
            description: epData.description,
            season: epData.season,
            episode: epData.episode,
            airDate: epData.airDate,
            thumbnail: epData.thumbnail,
            tags: epData.tags
          },
          // ensure character _id is in the array
          $addToSet: { characters: characterData._id }
        },
        {
          new: true, // return the updated or created doc
          upsert: true, // create if missing
          setDefaultsOnInsert: true
        }
      )
      episodesData.push(ep)
    }

    const newIds = episodesData.map(ep => ep._id)
    // atomically add only those not already in the array
    await character.updateOne(
      { _id: characterData._id },
      { $addToSet: { episodes: { $each: newIds } } }
    )

    // now re-populate and return
    const populated = await character
      .findById(characterData._id)
      .populate('episodes')
    await characterData.populate({
      path: 'episodes'
      // you can also pick only the fields you want:
      // select: 'code title description season episode airDate thumbnail tags'
    })
    await cacheDel(
      charKey(charId),
      userCharsKey(populated.createdBy.toString())
    )
    res.status(200).json({
      status: 'Success',
      message: 'Successfully generated episodes',
      data: populated
    })
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
}
