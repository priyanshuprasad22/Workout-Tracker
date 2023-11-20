const express= require('express')
const { loginuser,signupuser } = require('../controllers/userController')

const router = express.Router()

// login Route
router.post('/login',loginuser)

// signup Route

router.post('/signup',signupuser)


module.exports = router