import logger from '../../Logger/logger'
import generateToken from '../../Utilis/token'
import Users from './user.model'

export const createUser = async (req, res, next) => {
  try {
    const { email } = req.body
    let user = await Users.findOne({ email })

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
    logger.error('Failed to create user')
    next(new AppError('Failed to create user', 400))
  }
}
