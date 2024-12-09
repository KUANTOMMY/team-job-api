const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
//require('../erros) 因為默認是index所以errors/後面不用再搜索
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const userList = async (req, res) => {
  const users = await User.find({})
  res.status(StatusCodes.CREATED).send({ users })
}

const userBulkDelete = async (req, res) => {
  await User.deleteMany({})
  res.status(StatusCodes.CREATED).send('success')
}

const userDeleteOne = async (req, res) => {
  await User.findOneAndDelete({ _id: req.body.id })
  res.status(StatusCodes.CREATED).send('success')
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('please provide email or email')
  }
  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('invalide credentials')
  }
  //comparePassword 比較密碼
  const isPasswordCorrent = await user.comparePassword(password)
  if (!isPasswordCorrent) {
    throw new UnauthenticatedError('invalide credentials')
  }
  //compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login, userList, userDeleteOne, userBulkDelete }
