const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "6f2e98a4fee2a1b1f5101ae30c558c75";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
  https.get(url, function(response){

    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather in " + query + " is " + description + "</p>");
      res.write("<h1>The temp in " + query + " is " + temp + " degrees Celcius</h1>");
      res.write("<img src=" + imgURL +">");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000!");
});
