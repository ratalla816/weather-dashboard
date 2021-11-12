key = 'faa63307397f9a8437455fc4cacc3cd2'
elStorage = $('.prevSch')

# Saves the search text to local storage //
prevSch = []

init = ->
  prevSchSet = JSON.parse(localStorage.getItem('city'))
  if prevSchSet != null
    prevSch = prevSchSet
  persist()
  return

# dynamically creates buttons for previous searches //

persist = ->
  elStorage.empty()
  i = 0
  while i < prevSch.length
    elHistory = $('<row>')
    elButton = $('<button>').text(''.concat(prevSch[i]))
    elHistory.addClass 'row prevTab'
    elButton.addClass 'btn btn-secondary prevTab'
    elButton.attr 'type', 'button'
    elStorage.prepend elHistory
    elHistory.append elButton
    i++
 
  return

prevSchClick = (e) ->
  if !elButton.matches('.histBtn')
    return
  btn = e.target
  search = btn.getAttribute('city')
  currentWeather searchInit
  return

currentWeather = ->
  apiCurrent = 'https://api.openweathermap.org/data/2.5/weather?q='.concat(city, '&units=imperial&appid=').concat(key)
  $(cityCurrentMain).empty()
  $.ajax(
    url: apiCurrent
    method: 'GET').then (response) ->
    $('.cityCurrentName').text response.name
    $('.cityCurrentDate').text date
    $('.icons').attr 'src', 'https://openweathermap.org/img/wn/'.concat(response.weather[0].icon, '@2x.png')
    elSpeed = $('<a>').text('Wind Speed: '.concat(response.wind.speed, ' MPH'))
    cityCurrentMain.append elSpeed
    elMain = $('<p>').text('Temperature: '.concat(response.main.temp, ' °F'))
    cityCurrentMain.append elMain
    elHumidity = $('<a>').text('Humidity: '.concat(response.main.humidity, ' %'))
    cityCurrentMain.append elHumidity
    coordLon = response.coord.lon
    coordLat = response.coord.lat
    fetchUvi = 'https://api.openweathermap.org/data/2.5/onecall?lat='.concat(coordLat, '&lon=').concat(coordLon, '&exclude=hourly,daily,minutely&appid=').concat(key)
    $.ajax(
      url: fetchUvi
      method: 'GET').then (response) ->
      uviIndex = $('<p>').text('UV Index: ')
      elUvi = $('<span>').text(response.current.uvi)
      uvi = response.current.uvi
      uviIndex.append elUvi
      cityCurrentMain.append uviIndex
      #   Finally.... The UV Index Color changes!!!!!! //
      if uvi >= 0 and uvi <= 4
        elUvi.attr 'class', 'low'
      else if uvi > 5 and uvi <= 7
        elUvi.attr 'class', 'medium'
      else if uvi > 8 and uvi <= 12
        elUvi.attr 'class', 'barbeque'
      return
    return
  getOutlook()
  return

getOutlook = ->
  fetchOutlook = 'https://api.openweathermap.org/data/2.5/forecast?q='.concat(city, '&units=imperial&appid=').concat(key)
  $.ajax(
    url: fetchOutlook
    method: 'GET').then (response) ->
    outlookArray = response.list
    elWeather = []
    $.each outlookArray, (index, value) ->
      elData =
        icon: value.weather[0].icon
        date: value.dt_txt.split(' ')[0]
        time: value.dt_txt.split(' ')[1]
        temp: value.main.temp
        humidity: value.main.humidity
      if value.dt_txt.split(' ')[1] == '12:00:00'
        elWeather.push elData
      return
    #   create the forecast cards //
    i = 0
    while i < elWeather.length
      elCard = $('<div>')
      elCard.attr 'class', 'card bg-primary text-white mb-4'
      elOutlook.append elCard
      elHeader = $('<div>')
      elHeader.attr 'class', 'card-header'
      m = moment(''.concat(elWeather[i].date)).format('MM-DD-YYYY')
      elHeader.text m
      elCard.append elHeader
      elMain = $('<div>')
      elMain.attr 'class', 'card-body'
      elCard.append elMain
      elIcon = $('<img>')
      # icons will render based on weather object returned: https://openweathermap.org/weather-conditions //
      elIcon.attr 'src', 'https://openweathermap.org/img/wn/'.concat(elWeather[i].icon, '@2x.png')
      elMain.append elIcon
      elHumidity = $('<a>').text('Humidity: '.concat(elWeather[i].humidity, ' %'))
      elMain.append elHumidity
      elTemp = $('<p>').text('Temperature: '.concat(elWeather[i].temp, ' °F'))
      elMain.append elTemp
      i++
    return
  return

$('.search').on 'click', (event) ->
  event.preventDefault()
  city = $(this).parent('.srcInit').siblings('.cityText').val().trim()
  prevSch.push city
  localStorage.setItem 'city', JSON.stringify(prevSch)
  elOutlook.empty()
  persist()
  currentWeather()
  $('#prevSchSet').show()
  return
date = moment().format('dddd, MMMM Do YYYY')
dateTime = moment().format('YYYY-MM-DD HH:MM:SS')
cityCurrentMain = $('.cityCurrentMain')
elOutlook = $('.fiveDay')
init()
initPrevSch()
prevSchSet.addEventListener 'click', prevSchClick

# ---
# generated by js2coffee 2.2.0