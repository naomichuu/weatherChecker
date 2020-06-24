const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

const thePath = require("path");

app.use(express.static(thePath.join(__dirname)));

app.set('view engine', 'ejs');

app.get("/",function(req,res){
res.render("index",{listTitle:weather,newListItem:description});


});

app.post("/",function(req,res){

  const city = req.body.cityName;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=729c07778d3cc4157a8ccf1a7db16adf&units=metric"
    https.get(url, function(response){
      console.log(response);

     response.on("data",function(data){
        const weatherData = JSON.parse(data);
        if(weatherData.cod===200){
        const weather = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";

        res.render("index",{city:city,degree:weather,wetherDes:description,icon:icon});

}else{

  res.render("error",{errorMessage:"Please enter correct city name"});

}



      /*  res.write("<h1>The weather in "+ city+ " is "+ weather+ " degree</h1>");
        res.write("<p>The weather is " + description+ "<p>");
        res.write("the weather looks like "+"<img src =" + icon + ">");
        res.send();  */

      });





    });


  });




app.listen(process.env.PORT || 4000,function(){
  console.log("server is running on 4000");
});
