const express = require('express')
const router = express.Router()

const {
  login,
  register,
  userList,
  userDeleteOne,
  userBulkDelete,
} = require('../controllers/auth')

router.post('/login', login)
router.post('/register', register)
router.get('/userList', userList)
router.delete('/userDeleteOne', userDeleteOne)
router.delete('/userBulkDelete', userBulkDelete)

module.exports = router
