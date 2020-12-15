const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
    console.log(err, "ERROR");
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    // return new ErrorHandler(err.message, 400)
    next()
}