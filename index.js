const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
const https = require('https');

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var city = req.body.city;
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=ce6a2696a853bd14df830411a9b04d1d';
    
    https.get(url,function(response){
    
    response.on('data',(d)=>{
        const weatherData = JSON.parse(d);
        const temp = weatherData.coord.lon;
        const desc = weatherData.weather[0].description;
        res.send("The temprature is:"+temp+"and the description is "+desc);
        
    });
});
});
app.listen(3000,function(){
    console.log("Listening on 3000");
});