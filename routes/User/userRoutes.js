const router = require('express').Router()
const { signUp, login } = require('../../controllers/Auth/authController')



//Authentication Routes
router.post("/signup", signUp)
router.post("/login", login)




module.exports = router