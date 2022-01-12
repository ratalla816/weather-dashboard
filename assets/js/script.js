let key = 'faa63307397f9a8437455fc4cacc3cd2';

let prevSch = [];

$('.search').on("click", function (event) {
    event.preventDefault();

    city = $(this).parent('.srcInit').siblings('.cityText')
        .val()
        .trim();

    prevSch.push(city);
    localStorage.setItem('city', JSON.stringify(prevSch));
    elOutlook.empty();

    currentWeather();
    persist();

});

let elStorage = $('.prevSch');

function persist() {

    elStorage.empty();
    for (let i = 0; i < prevSch.length; i++) {
        let elHistory = $('<row>');
        let elButton = $('<button>').text("".concat(prevSch [i] ));

        elHistory.addClass('row prevTab');
        elButton.addClass('prevTab');
        elButton.attr('type', 'button');

        elStorage.prepend(elHistory);
        elHistory.append(elButton);
    }

}

let elPrevList = $('.prevSch');

function persist() {

    elPrevList.empty();

    for (let i = 0; i < prevSch.length; i++) {
        let listItem = $('<row>');
        let listButton = $('<button>').text("" + prevSch [i] );
        
        listButton.addClass('btn btn-primary prevObjBtn <br>');
        listItem.addClass('row prevObjRow');
        listButton.attr('type', 'button');

        elPrevList.prepend(listItem);
        listItem.append(listButton);
    }

    $('.prevObjBtn')

        .on("click", function (event) {
            city = $(this).text();

            event.preventDefault();

            elOutlook.empty();
            
            currentWeather();

        });
};

let dateTime = moment().format('YYYY-MM-DD HH:MM:SS');
let date = moment().format('dddd, MMMM Do YYYY');

let cityCurrentMain = $('.cityCurrentMain');

function currentWeather() {
    let apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q="
        .concat(city, "&units=imperial&appid=").concat(key);

    $(cityCurrentMain).empty();

    $.ajax
        ({ url: apiCurrent, method: 'GET' })

        .then(function (response) {
            $('.icons').attr('src', "https://openweathermap.org/img/wn/"
                .concat(response.weather[0].icon, "@2x.png"));

            $('.cityCurrentName').text(response.name);
            $('.cityCurrentDate').text(date);

            let coordLon = response.coord.lon;
            let coordLat = response.coord.lat;

            let elSpeed = $('<a>').text("Wind Speed: ".concat(response.wind.speed, " MPH"));
            cityCurrentMain.append(elSpeed);

            let elMain = $('<p>').text("Temperature: ".concat(response.main.temp, " \xB0F"));
            cityCurrentMain.append(elMain);

            let elHumidity = $('<a>').text("Humidity: ".concat(response.main.humidity, " %"));
            cityCurrentMain.append(elHumidity);

            let fetchUvi = "https://api.openweathermap.org/data/2.5/onecall?lat=".concat(coordLat, "&lon=")
                .concat(coordLon, "&exclude=hourly,daily,minutely&appid=").concat(key);

            $.ajax
                ({ url: fetchUvi, method: 'GET' })

                .then(function (response) {
                    let uviIndex = $('<p>').text("UV Index: ");

                    let elUvi = $('<span>').text(response.current.uvi);

                    let uvi = response.current.uvi;
                    cityCurrentMain.append(uviIndex);
                    uviIndex.append(elUvi);

                    //   Finally.... The UV Index Color changes!!!!!! //
                    if (uvi >= 0 && uvi <= 4) {
                        elUvi.attr('class', 'low');

                    } else if (uvi > 4 && uvi <= 7) {
                        elUvi.attr("class", "medium");

                    } else if (uvi > 8 && uvi <= 20) {
                        elUvi.attr("class", "barbeque");
                    }

                });
        });

    renderOutlook();

};

let elOutlook = $('.fiveDay');

function renderOutlook() {
    let fetchOutlook = "https://api.openweathermap.org/data/2.5/forecast?q="
        .concat(city, "&units=imperial&appid=").concat(key);

    $.ajax
        ({ url: fetchOutlook, method: 'GET' })

        .then(function (response) {
            let aussichtsGruppe = response.list;
            let elWeather = [];

            $.each
                (aussichtsGruppe, function (index, value) {

                    elData = {
                        icon: value.weather[0].icon,
                        time: value.dt_txt.split (' ') [1],
                        date: value.dt_txt.split (' ') [0],
                        humidity: value.main.humidity,
                        temp: value.main.temp,
                    };

                    if (value.dt_txt.split (' ') [1] === "12:00:00") {
                        elWeather.push(elData);
                    }

                });

            for (let i = 0; i < elWeather.length; i++) {


                let elCard = $('<div>');
                elCard.attr('class', 'card bg-primary text-white mb-4');
                elOutlook.append(elCard);

                let elHeader = $('<div>');
                elHeader.attr('class', 'card-header');

                let m = moment("".concat(elWeather [i] .date))
                    .format('MM-DD-YYYY');
                elHeader.text(m);
                elCard.append(elHeader);

                let elMain = $('<div>');
                elMain.attr('class', 'card-body');
                elCard.append(elMain);

                let elIcon = $('<img>');

                // icons render based on weather object returned: https://openweathermap.org/weather-conditions //
                elIcon.attr('src', "https://openweathermap.org/img/wn/"
                    .concat(elWeather[i].icon, "@2x.png"));
                elMain.append(elIcon);

                let elHumidity = $('<a>').text("Humidity: ".concat(elWeather [i] .humidity, " %"));
                elMain.append(elHumidity);

                let elTemp = $('<p>').text("Temperature: ".concat(elWeather [i] .temp, " \xB0F"));
                elMain.append(elTemp);

            }

        });
};

function render() {
    let prevSchSet = JSON.parse(localStorage.getItem('city'));

    if (prevSchSet !== null) {
        prevSch = prevSchSet;
    }

    persist();
    currentWeather();
};

render();