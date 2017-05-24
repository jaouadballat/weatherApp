"use strict";
//30°C x 1.8 + 32 = 86°F
var cel = true;

function isCel(){
    cel=!cel;

}

function celTofah(c, cel){
    if(cel==false){
        
        return Math.round(c*1.8+32)+"°F";
    }
    
    return Math.round(c)+"°C";
}
function getLocation() {
	$.getJSON("http://ip-api.com/json", function(data) {
        $('.city').text(data.city+', '+data.country);
		getWeatherInfo(data.city);
	}, function(err){
		console.log(err);
	});
	 
}
function getWeatherInfo(city){
	var url = 'http://api.openweathermap.org/data/2.5/find';
	$.getJSON(url,
		{
			q: city,
			units: "metric",
			appid: "52d978da8776ab054f0bffddb08d0567"
		},
		 function(data){
            $('#temperature').text(celTofah(data.list[0].main.temp, cel));
            $("#description").text(data.list[0].weather[0].description);
            $("#humidity").text(data.list[0].main.humidity+"% humidity");
            $("#speed").text(data.list[0].wind.speed+ "mph wind");
            $(".weather-main").text(data.list[0].weather[0].main);
            $("#temp-min").text("Min "+celTofah(data.list[0].main.temp_min, cel));
            $("#temp-max").text("Max "+celTofah(data.list[0].main.temp_max, cel));
            $("#weather-icon").attr("src", "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+".png");
    }, function(err){
		console.log(err)
	})
}
$(document).ready(function(){
	getLocation();
    $('#temperature').click(function(e){
            e.preventDefault();
            isCel();
            getLocation();
    })	
});

