import jwt from 'jsonwebtoken'

const generateToken = userInfo => {
  const playLoad = {
    _id: userInfo?._id,
    name: userInfo.name,
    email: userInfo.email,
  }

  const token = jwt.sign(playLoad, process.env.TOKEN_SECRET, {
    expiresIn: '10h'
  })

  return token
}

export default generateToken