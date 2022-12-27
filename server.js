const express = require('express')
const dotenv = require('dotenv')
const weatherRouter = require('./routes/weatherRoutes')

dotenv.config({
  path: './config.env'
})

const PORT = process.env.PORT

const app = express()

app.use('/', weatherRouter)

app.listen(PORT, () => {
  console.log('Server is running...')
})
