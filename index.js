require('dotenv').config()
const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const mongoose = require('mongoose')
const { PORT, DB_CONNECTION_STRING } = require('./config')

const cloudinary = require('./middlewares/cloudinaryMiddleware')
const cors = require('./config/cors')
const userController = require('./controllers/userController')
const listController = require('./controllers/listController')
const noteCotroller = require('./controllers/noteCotroller')
const commentCotroller = require('./controllers/commentController')

serverOn()

async function serverOn() {
  try {
    mongoose.connect(DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = mongoose.connection
    console.log(`DB connected !`)
  } catch (err) {
    console.log(err.message)
  }

  const app = express()
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: { origin: [process.env.CLIENT_BASE_URL] },
  })

  app.use(cloudinary())
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))
  app.use(cors())

  app.use('/user', userController)
  app.use('/list', listController)
  app.use('/note', noteCotroller)
  app.use('/comment', commentCotroller)
  app.get('*', (req, res) => res.status(404).json('Not found !'))

  io.on('connection', (socket) => {
    console.log('user connected !');
    socket.on('server-refresh-all', (refresh) => {
      io.emit('client-refresh-all', refresh)
    })
    socket.on('server-refresh-list-title-all', (refresh) => {
      io.emit('client-refresh-list-title-all', refresh)
    })
    socket.on('disconnect', () => {
    console.log('user disconnected !');
  });
  })

  server.listen(PORT, () => {
    console.log(`Server NSRV is ON !`)
    console.log(`mode: ${process.env.MODE}`)
  })
}

// db.on('error', (err) => console.log(err.message))
// db.once('open', () => console.log(`DB connected ${DB_CONNECTION_STRING}`))
