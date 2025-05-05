import logger from '../../Logger/logger.js'
import character from './character.model.js'
import { analyzePersonality, generateBackstory } from './character.service.js'

export const createCharacter = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { backstoryToggle, ...data } = req.body
    data.createdBy = _id

    const newChar = await character.create(data)

    if (backstoryToggle) {
      try {
        const backstory = await generateBackstory({
          name: newChar.name,
          species: newChar.species,
          origin: newChar.origin,
          status: newChar.status,
          gender: newChar.gender
        })

        newChar.backstory = backstory
        newChar.backstoryGeneratedAt = new Date()
        await newChar.save()
      } catch (err) {
        logger.error(
          `Backstory generation failed for character ${newChar._id}: ${err.message}`
        )
        // optionally, you could flag this on the document or in the response
      }
    }

    res.status(200).json({
      status: 'Success',
      message: 'Character successfully created',
      data: newChar
    })
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
}

export const getMyCharacter = async (req, res, next) => {
  try {
    const { _id } = req.user
    const characters = await character.find({ createdBy: _id }).populate({
      path: 'createdBy'
    })
    res.status(200).json({
      status: 'Success',
      message: 'Fetched the character successfully',
      data: characters
    })
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
}

export const deleteMyCharacter = async (req, res, next) => {
  try {
    const { id } = req.params
    const isCharacter = await character.findOne({ _id: id })

    if (!isCharacter) {
      logger.error('Character can not be find')
      return res.status(404).json({
        status: 'Fail',
        message: 'Character can not be found'
      })
    }

    await character.deleteOne({ _id: id })

    res.status(200).json({
      status: 'Success',
      message: 'Successfully deleted the CHaracter'
    })
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
}

export const updateMyCharacter = async (req, res, next) => {
  try {
    const { id } = req.params
    const updates = req.body

    const characterData = await character.findOne({
      _id: id,
      createdBy: req.user._id
    })
    if (!characterData) {
      return res
        .status(404)
        .json({ message: 'Character not found or not owned by you' })
    }

    Object.assign(characterData, updates)

    const updated = await characterData.save()
    res.status(200).json({
      status: 'Success',
      message: 'Updated Successfully'
    })
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}

export const reGenerateBackstories = async (req, res, next) => {
  try {
    const { id } = req.params
    const char = await character.findOne({ _id: id })

    if (!char) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Character not found'
      })
    }

    const backstory = await generateBackstory({
      name: char.name,
      species: char.species,
      origin: char.origin,
      status: char.status,
      gender: char.gender
    })

    char.backstory = backstory
    char.backstoryGeneratedAt = new Date()
    char.backstorySource = 'openai-stream'
    await char.save()

    res.status(200).json({
      status: 'Success',
      message: 'Backstory regenerated',
      data: char
    })
  } catch (error) {
    logger.error(
      `Backstory regeneration failed for ${req.params.id}: ${error.message}`
    )
    next(error)
  }
}

export const getSingleCharacter = async (req, res, next) => {
  try {
    const { id } = req.params

    const char = await character.findOne({ _id: id }).populate({
      path: 'episodes'
    })
    if (!char) {
      logger.warn('Character not found')
      return next(new Error('Character not found'))
    }

    res.status(200).json({
      status: 'Success',
      message: 'Single Character',
      data: char
    })
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
}

export const runAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params
    const char = await character.findOne({ _id: id })
    if (!char) throw new Error('Character not found')
    const { scores, summary } = await analyzePersonality(char.backstory)
    char.personality = scores
    char.personalitySummary = summary
    await char.save()
    await char.populate({
      path: 'episodes'
      // you can also pick only the fields you want:
      // select: 'code title description season episode airDate thumbnail tags'
    })
    res.status(200).json({
      status: 'success',
      message: 'Successfully analysis the big5',
      data: char
    })
  } catch (error) {
    logger.error(error.message)
    next(error)
  }
}
