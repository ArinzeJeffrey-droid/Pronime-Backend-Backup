const mongoose = require("mongoose")
const dotenv = require("dotenv")

//Handling process errors
process.on('uncaughtException', err => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1)
})

dotenv.config({ path: "./.env" })
const app = require("./app")




//Establishing MongoDB database connection.
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB Connection Successfully"))


//server
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


//Handling process errors
process.on('unhandledRejection', err => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1)
    })
})