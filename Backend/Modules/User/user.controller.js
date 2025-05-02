import logger from '../../Logger/logger.js'
import generateToken from '../../Utilis/token.js'
import Users from './user.model.js'

export const createUser = async (req, res, next) => {
  try {
    const { email } = req.body
    let user = await Users.findOne({ email })
    let message
    if (!user) {
      user = await Users.create(req.body)
      res.status(201)
      message = 'User created successfully'
    } else {
      logger.info('User already Exist')
      res.status(200)
      message = 'User already exists'
    }

    const token = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email
    })
    res.json({ status: 'Success', message, data: user, token })
  } catch (error) {
    logger.error(error)
    next('Failed to create user')
  }
}

export const fetchUser = async (req, res, next) => {
  try {
    const data = req.body
    const user = await Users.findOne({ email: data.email })

    if (!user) {
      const err = new Error('User not found')
      err.statusCode = 404
      return next(err)
    }

    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    logger.error(`Error in fetchUser: ${error.stack}`)
    next(error)
  }
}
