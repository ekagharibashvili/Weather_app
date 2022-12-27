const citiesData = require('../data')
const cities = citiesData.cities
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config({
  path: './config.env'
})
const SECRET_KEY = process.env.SECRET_KEY
// fetchUrls
const urls = cities.map((city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city},+995&appid=${SECRET_KEY}`
})

exports.getWeather = async (req, res) => {
  try {
    const city = req.query.city
    const isIncluded = cities.includes(city)
    // retrieve weather for one, supported city
    if (isIncluded) {
      const weather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},+995&appid=${SECRET_KEY}`
      )
      const data = await weather.json()
      res.status(200).json({
        status: 'OK',
        data
      })
      // return result for unsupported city
    } else if (city !== '' && !isIncluded) {
      res.status(404).json({
        status: 'Not Found',
        data: 'This city is not supported'
      })
      // retrieve weather of every city from array
    } else {
      const responsePromises = urls.map((url) => {
        return fetch(url)
      })
      const responses = await Promise.all(responsePromises)
      const data = await Promise.all(responses.map((response) => response.json()))
      res.status(200).json({
        status: 'OK',
        data
      })
    }
  } catch (err) {
    console.log(JSON.stringify(err, null, 2))
  }
}
