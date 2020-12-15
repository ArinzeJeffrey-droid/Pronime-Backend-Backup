const User = require("../../models/User/userModel")
const CatchAsyncError = require("../../utils/asyncErrorsCatch")
const jwt = require("jsonwebtoken")

//Function that assigns the JWT to a specific user
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

//Function that sends token based on the request
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if(process.env.NODE_ENV === "production") cookieOptions.secure = true
    //send the JWT as a cookie
    res.cookie('jwt', token, cookieOptions)
    user.password = undefined
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    })
}


//Registering a new User
exports.signUp = CatchAsyncError( async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser, 201, res)
})

//Logging in User
exports.login = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password){
        return next(new ErrorHandler('Please provide email and password', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if(!user || !await user.correctPassword(password, user.password)){
        return next(new ErrorHandler("Incorrect email or password", 401))
    }
    createSendToken(user, 200, res)
})