
module.exports = {
    PORT: process.env.REACT_APP_BASEURL || 5151,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    TOKEN_SECRET: process.env.TOKEN_SECRET
    // DB_CONNECTION_STRING: "mongodb://localhost:27017/Notes",
    // DB_CONNECTION_STRING: "mongodb+srv://npn:5151-npp1515-0w@cluster0.8ijirbc.mongodb.net/test",
    // TOKEN_SECRET: "asdf123-321fdsa",
}
