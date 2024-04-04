const baseURL = 'https://api.openweathermap.org/data/2.5'
const apiKey = 'e9621bce5c4f4f8785b30e2365e66bfb'


function outputCurrentWeather(currentData) {

    const temp = $('#current-temp')
    const wind = $('#wind-speed')
    const humidity = $('#humidity')


    temp.text(`Temp: ${currentData.main.temp.toFixed(0)}`)
    wind.text(`Wind: ${currentData.wind.speed} mph`)

    return currentData.name
}


function getCurrentWeatherByCity (cityName) {

const url = `${baseURL}/weather?q=${cityName}&appid=${apiKey}&units=imperial`;


console.log("The city is :" + cityName)
return $.get(url)

}







getCurrentWeatherByCity('london')
outputCurrentWeather()