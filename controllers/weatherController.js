const citiesData = require('../data')
const cities = citiesData.cities
const fetch = require('node-fetch')
const dotenv = require('dotenv')

dotenv.config({
  path: './config.env'
})

const SECRET_KEY = process.env.SECRET_KEY

exports.getWeather = async (req, res) => {
  try {
    const city = req.query.city
    const isIncluded = cities.includes(city)
    if (isIncluded) {
      const weather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},+995&appid=${SECRET_KEY}`
      )
      const response = await weather.json()
      res.status(200).json({
        status: 'OK',
        data: response
      })
    } else if (!isIncluded) {
      res.status(404).json({
        status: 'Not Found',
        data: 'This city is not supported'
      })
    }
  } catch (err) {
    console.log(JSON.stringify(err, null, 2))
  }
}
