const mongoose = require("mongoose")
const URL_MONGODB = "mongodb://127.0.0.1:27017/loco_dummy"

mongoose
    .connect(URL_MONGODB)
    .then(() => {
        console.log("Database Connected")
    })
    .catch(() => {
        console.log("Database Disconnected")
    })

module.exports = mongoose