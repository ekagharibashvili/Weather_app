const express = require('express')
const weatherController = require('../controllers/weatherController')
const router = express.Router()

router.route('/').get(weatherController.getWeather)

module.exports = router
