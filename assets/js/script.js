let key = 'faa63307397f9a8437455fc4cacc3cd2';

function init() {
  let prevSchSet = JSON.parse(localStorage.getItem('city'));

  if (prevSchSet !== null) {
    prevSch = prevSchSet;
  }

  persist();
}

let date = moment().format('dddd, MMMM Do YYYY');

let dateTime = moment().format('YYYY-MM-DD HH:MM:SS');

let cityCurrentMain = $('.cityCurrentMain');

function currentWeather() {
  let apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&units=imperial&appid=").concat(key);

  $(cityCurrentMain).empty();


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
            
            if (uvi >= 0 && uvi <= 4) {
                elUvi.attr('class', 'green');
    
              } else if (uvi > 5 && uvi <= 7) {
                elUvi.attr("class", "orange");
    
              } else if (uvi > 8 && uvi <= 12) {
                elUvi.attr("class", "red");
              }

 var elOutlook = $('.fiveDay');




}}

init();

