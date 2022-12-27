const citiesData = require('../data')
const cities = citiesData.cities
const fetch = require('node-fetch')
const { returnOneUrl } = require('../utils/urls')
const { returnManyUrl } = require('../utils/urls')

exports.getWeather = async (req, res) => {
  try {
    const city = req.query.city
    const isIncluded = cities.includes(city)
    // retrieve weather for one, supported city
    if (isIncluded) {
      const weather = await fetch(returnOneUrl(city))
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
      const responsePromises = returnManyUrl.map((url) => {
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
