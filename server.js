const express = require('express')
const request = require('request')
const dotenv = require('dotenv')
const data = require('./data')
const cities = data.cities

// defining environment variables
dotenv.config({
  path: './config.env'
})

// constants
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY

const app = express()

app.get('/', (req, res) => {
  let city = req.query.city
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},+995&appid=${SECRET_KEY}`,
    function (error, response, body) {
      const data = JSON.parse(body)
      if (response.statusCode !== 200) {
        return error.message
      } else {
        if (cities.includes(city)) {
          res.send(
              `The weather in "${city}" is ${data.weather[0].description}`
          )
        } else if (city !== '' && !cities.includes(city)) {
          res.send('This city is not supported')
        } else {
          const weatherArr = []
          for (let i = 0; i < cities.length; i++) {
            city = cities[i]
            weatherArr.push(
                `The weather in "${city}" is ${data.weather[0].description}.`
            )
          }
          return res.send(weatherArr.join('<br>'))
        }
      }
    }
  )
})

app.listen(PORT, () => {
  console.log('Server is running...')
})
