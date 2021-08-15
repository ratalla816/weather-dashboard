// appId = "faa63307397f9a8437455fc4cacc3cd2";

function createCityList(citySearchList) {
    $("#search-results").empty();
// Step one - ID the json objects 
var keys = Object.keys(citySearchList);
for (var i = 0; i < keys.length; i++) {
    var cityListEntry = $("<button>")

    // UL //
    cityListEntry.addClass("list-group-item list-group-item-action");
    cityListEntry.text(keys[i]);


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

function formatSearch(jsonObject) {
        var city_name = jsonObject.name;
        var city_weather = jsonObject.weather[0].main;
        var city_temp = jsonObject.main.temp;
        var cityUvIndex = jsonObject.main.uvIndex;
        
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

}






}


// $("forecast").show(); ??