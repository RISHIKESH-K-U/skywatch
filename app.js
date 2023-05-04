const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const clong = req.body.long;
  const clat = req.body.lat;
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="; //+ENTER API KEY +
  "&lat=" + clat + "&lon=" + clong;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const icon = weatherdata.weather[0].icon;
      const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The current weather details are:</h1>");
      res.write("<p>" + JSON.stringify(weatherdata) + "</p>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});
app.listen(3000, function (req, res) {
  console.log("Project running on port 3000");
});
