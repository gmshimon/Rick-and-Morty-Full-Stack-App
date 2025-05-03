import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import dotenv from 'dotenv'

dotenv.config()

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        status: 'Failed',
        message: 'You must be logged in'
      })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET)

    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({
      status: 'Failed',
      message: 'Invalid token',
      error: error.message
    })
  }
}

export default verifyToken
