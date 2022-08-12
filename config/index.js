
module.exports = {
    PORT: process.env.REACT_APP_BASEURL || process.env.LOCAL_PORT,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
}
