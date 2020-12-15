const express = require("express")
const app = express()
const morgan = require("morgan")
const globalErrorHandler = require("./controllers/errorController")
const userRoutes = require("./routes/User/userRoutes")


//MIDDLEWARE
app.use(express.json())

//Development logger
if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


//Routes
app.use('/api/v1/users', userRoutes)

//Global Error Handling Middleware
app.use(globalErrorHandler)


module.exports = app