import logger from '../../Logger/logger.js'
import character from '../Character/character.model.js'
import relationships from './relation.model.js'
import { classifyRelationship, cosineSimilarity, embedWithHuggingFace } from './relation.service.js'

export const createRelationship = async (req, res,next) => {
  try {
    const { charAId, charBId } = req.body

    const [charA, charB] = await character.find({
      _id: { $in: [charAId, charBId] }
    })

    if (!charA || !charB) {
      return res
        .status(404)
        .json({ error: 'One or both characters not found.' })
    }

    // Ensure embeddings exist
    for (let char of [charA, charB]) {
      if (!Array.isArray(char.embedding) || char.embedding.length === 0) {
        char.embedding = await embedWithHuggingFace(char.backstory)
        await char.save()
      }
    }

    // Compute similarity and classify
    const sim = cosineSimilarity(charA.embedding, charB.embedding)
    const type = classifyRelationship(sim)

    // Upsert the relationship doc
    const relationship = await relationships.create({
      charA: charA._id,
      charB: charB._id,
      similarity: sim,
      type
    })

    const getRelationData = await relationships.findOne({_id:relationship._id}).populate('charA', 'name image')
    .populate('charB', 'name image')
    return res.status(201).json({
      status: 'Success',
      message: 'Predict the relation successfully',
      data: getRelationData
    })
  } catch (error) {
    logger.error(error.message)
    return next(error)
  }
}

export async function getRelationshipsForCharacter (req, res, next) {
  const { characterId } = req.params

  try {
    // Fetch all relationships where this character is either A or B
    const relationshipsData = await relationships
      .find({
        $or: [{ charA: characterId }, { charB: characterId }]
      })
      .populate('charA', 'name image')
      .populate('charB', 'name image')
      .sort({ createdAt: -1 })
console.log(relationshipsData)
    return res.status(200).json({
      status: 'success',
      message: 'Relation fetched successfully',
      data: relationshipsData
    })
  } catch (err) {
    logger.error(err.message)
    return next(err)
  }
}
