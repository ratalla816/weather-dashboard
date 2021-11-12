
# I tried to write this in coffeescript for funzies, but I could not get it to work with $ajax :(

key = 'faa63307397f9a8437455fc4cacc3cd2'

prevSch = []

persist = ->
  elStorage.empty()
  i = 0
  while i < prevSch.length
    elHistory = $('<row>')
    elButton = $('<button>')
    .text(''.concat(prevSch[i]))

    elHistory.addClass 'row prevTab'
    elButton.addClass 'prevTab'
    elButton.attr 'type', 'button'
    elStorage.prepend elHistory
    elHistory.append elButton
    i++
  return

# 
#            _
#        .__(.)< (YOWZA)
#         \___)   
#  ~~~~~~~~~~~~~~~~~~~

persist = ->
  elPrevList.empty()
  i = 0
  while i < prevSch.length

    listItem = $('<row>')

    listButton = $('<button>').text('' + prevSch[i])

    listButton.addClass 'btn btn-primary prevObjBtn <br>'
    listItem.addClass 'row prevObjRow'
    listButton.attr 'type', 'button'

    elPrevList.prepend listItem
    listItem.append listButton
    i++

  $('.prevObjBtn').on 'click', (event) ->
    
    city = $(this).text()

    event.preventDefault()

    elOutlook.empty()

    currentWeather()

    return

  return

currentWeather = ->

  apiCurrent = 'https://api.openweathermap.org/data/2.5/weather?q='
  .concat(city, '&units=imperial&appid=').concat(key)

  $(cityCurrentMain).empty()

  $.ajax(

    url: apiCurrent
    method: 'GET').then (response) ->
    $('.icons').attr 'src', 'https://openweathermap.org/img/wn/'
    .concat(response.weather[0].icon, '@2x.png')

    $('.cityCurrentName').text response.name
    $('.cityCurrentDate').text date

    coordLon = response.coord.lon
    coordLat = response.coord.lat

    elSpeed = $('<a>').text('Wind Speed: '.concat(response.wind.speed, ' MPH'))
    cityCurrentMain.append elSpeed

    elMain = $('<p>').text('Temperature: '.concat(response.main.temp, ' °F'))
    cityCurrentMain.append elMain

    elHumidity = $('<a>').text('Humidity: '.concat(response.main.humidity, ' %'))
    cityCurrentMain.append elHumidity

    fetchUvi = 'https://api.openweathermap.org/data/2.5/onecall?lat='
    .concat(coordLat, '&lon=').concat(coordLon, '&exclude=hourly,daily,minutely&appid=').concat(key)

    $.ajax(
      url: fetchUvi
      method: 'GET').then (response) ->
      uviIndex = $('<p>').text('UV Index: ')

      elUvi = $('<span>').text(response.current.uvi)

      uvi = response.current.uvi
      cityCurrentMain.append uviIndex
      uviIndex.append elUvi
    
      if uvi >= 0 and uvi <= 4
        elUvi.attr 'class', 'low'
      else if uvi > 5 and uvi <= 7
        elUvi.attr 'class', 'medium'
      else if uvi > 8 and uvi <= 12
        elUvi.attr 'class', 'barbeque'
      return
  
    return

  renderOutlook()

  return

renderOutlook = ->
  fetchOutlook = 'https://api.openweathermap.org/data/2.5/forecast?q='
  .concat(city, '&units=imperial&appid=').concat(key)

  $.ajax(
    url: fetchOutlook
    method: 'GET').then (response) ->
    aussichtsGruppe = response.list
    elWeather = []

    $.each 
    aussichtsGruppe, (index, value) ->
      
      elData =
        icon: value.weather[0].icon

        time: value.dt_txt.split(' ')[1]

        date: value.dt_txt.split(' ')[0]

        humidity: value.main.humidity

        temp: value.main.temp

      if value.dt_txt.split(' ')[1] == '12:00:00'
        elWeather.push elData
        
      return

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

      elIcon.attr 'src', 'https://openweathermap.org/img/wn/'
      .concat(elWeather[i].icon, '@2x.png')

      elMain.append elIcon
      elHumidity = $('<a>').text('Humidity: '.concat(elWeather[i].humidity, ' %'))
      elMain.append elHumidity

      elTemp = $('<p>').text('Temperature: '.concat(elWeather[i].temp, ' °F'))
      elMain.append elTemp
      i++
    return

  return

render = ->
  prevSchSet = JSON.parse(localStorage.getItem('city'))
  if prevSchSet != null
    prevSch = prevSchSet

  persist()

  currentWeather()

  return

$('.search').on 'click', (event) ->
  event.preventDefault()
  city = $(this).parent('.srcInit').siblings('.cityText').val().trim()

  prevSch.push city
  localStorage.setItem 'city', JSON.stringify(prevSch)

  elOutlook.empty()

  currentWeather()

  persist()

  return

elStorage = $('.prevSch')

elPrevList = $('.prevSch')

dateTime = moment().format('YYYY-MM-DD HH:MM:SS')
date = moment().format('dddd, MMMM Do YYYY')

cityCurrentMain = $('.cityCurrentMain')
elOutlook = $('.fiveDay')

render()