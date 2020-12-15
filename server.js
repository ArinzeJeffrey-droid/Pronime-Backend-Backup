const app = require("./app")
const dotenv = require("dotenv")

dotenv.config({ path: "./.env" })



//server
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})