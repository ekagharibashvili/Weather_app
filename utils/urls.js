const citiesData = require('../data')
const cities = citiesData.cities
const dotenv = require('dotenv')
dotenv.config({
  path: './config.env'
})

const SECRET_KEY = process.env.SECRET_KEY

exports.returnOneUrl = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city},+995&appid=${SECRET_KEY}`
}

exports.returnManyUrl = cities.map((city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city},+995&appid=${SECRET_KEY}`
})
