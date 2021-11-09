var key = 'faa63307397f9a8437455fc4cacc3cd2';


    $(document).ready(function() {
        $("#form-submit").submit(function(event) {
            performSearch(event);
        });
});

    function performSearch(event) {
        var request;
        event.preventDefault();

        request = $.ajax({
            url:'https://api.openweathermap.org/data/2.5/weather',
            type: "GET",
            data: {
                q: $("#city").val(),
                appid: 'faa63307397f9a8437455fc4cacc3cd2',
                units: 'imperial'
            }
        });

        request.done(function(response) {
            formatSearch(response);
        });
}

var cityCurrentBody = $('.cityCurrentBody')
function currentWeather() {
	var apiCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

	$(cityCurrentBody).empty();

	$.ajax({
		url: apiCurrent,
		method: 'GET',
	}).then(function (response) {
		$('.cityCurrentName').text(response.name);
		$('.cityCurrentDate').text(date);
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

        
// Display current weather data
        $("#city-name").text(city_name);
        $("#city-weather").text(city_weather);
        $("#city-temp").text(city_temp+ "℉");

        // use another fetch (openweathermap.org) to get UVI
        $("#cityUvIndex").text("UV Index" +cityUvIndex);

        cityUvIndex.addClass; {
            if (uvIndex>=0 && uvIndex<3) {
               cityUvIndex.attr(uv-dangerLow);
            
            } else if (uvIndex>=3 && uvIndex<8) {
                cityUvIndex.attr(uv-dangerMedium);
              
            } else if  (uvindex>=8) {
                cityUvIndex.attr(uv-dangerHigh);
              }

 var elOutlook = $('.fiveDay');

function getOutlook() {
var fetchOutlook = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;


}}

init();

