const express = require("express");
const request = require("request");
// https://api.openweathermap.org/data/2.5/weather?q=Tbilisi,+995&appid=5afdcbbb49b62e806381f7a8e0cb0e4d
const app = express();

app.get("/", (req, res) => {
  let cities = ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Borjomi"];
  let city = req.query.city;
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},+995&appid=5afdcbbb49b62e806381f7a8e0cb0e4d`,
    function (error, response, body) {
      let data = JSON.parse(body);
      if (response.statusCode === 200) {
        if (cities.includes(city)) {
          res.send(
            `The weather in "${city}" is ${data.weather[0].description}`
          );
        } else if (city !== "" && !cities.includes(city)) {
          res.send("This city is not supported");
        } else {
          let weatherArr = [];
          for (let i = 0; i < cities.length; i++) {
            city = cities[i];
            console.log(city);
            weatherArr.push(
              `The weather in "${city}" is ${data.weather[0].description}.`
            );
          }
          return res.send(weatherArr.join("<br>"));
        }
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
