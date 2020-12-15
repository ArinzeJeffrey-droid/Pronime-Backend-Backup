const express = require("express")
const app = express()
const globalErrorHandler = require("./controllers/errorController")


//MIDDLEWARE
app.use(express.json())


app.use(globalErrorHandler)




module.exports = app