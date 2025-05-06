import jwt from 'jsonwebtoken'

const generateToken = userInfo => {
  const playLoad = {
    _id: userInfo?._id,
    name: userInfo.name,
    email: userInfo.email,
  }

  const token = jwt.sign(playLoad, process.env.TOKEN_SECRET)

  return token
}

export default generateToken