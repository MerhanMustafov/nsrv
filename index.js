const express = require('express')
const mongoose = require('mongoose')
const { PORT, DB_CONNECTION_STRING } = require('./config')
const cors = require('./config/cors')
const userController = require('./controllers/userController')
const listController = require('./controllers/listController')
const noteCotroller = require('./controllers/noteCotroller')
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
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))

  app.use(cors())

  app.use('/user', userController)
  app.use('/list', listController)
  app.use('/note', noteCotroller)
  app.get('*', (req, res) => res.status(404).json('Not found !'))

  app.listen(PORT, () => {
    console.log(`Server NSRV is ON !`)
  })
}

// db.on('error', (err) => console.log(err.message))
// db.once('open', () => console.log(`DB connected ${DB_CONNECTION_STRING}`))
