module.exports = () => (req, res, next) => {
    // ${process.env.CLIENT_BASE_URL}
    res.setHeader('Access-Control-Allow-Origin', `${process.env.PORT}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH,DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    next()
}