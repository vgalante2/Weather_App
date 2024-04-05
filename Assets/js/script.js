const baseURL = 'https://api.openweathermap.org/data/2.5'
const apiKey = 'e9621bce5c4f4f8785b30e2365e66bfb'


const weatherSubmit = document.querySelector('#weatherSubmit')

function outputCurrentWeather(currentData) {

    const temp = $('#current-temp')
    const wind = $('#wind-speed')
    const humidity = $('#humidity')


    temp.text(`Temp: ${currentData.main.temp.toFixed(0)} °`)
    wind.text(`Wind: ${currentData.wind.speed} mph`)

    return currentData.name
}




function getCurrentWeatherByCity (cityName) {

const url = `${baseURL}/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  
 
console.log("The city is :" + cityName)

return $.get(url).then(function(weatherObj) {
      
    localStorage.setItem('currentWeatherData', JSON.stringify(weatherObj))
     
       console.log(weatherObj)
    }
)

}



function getForecastWeather(cityName) {
    const options = `/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    const url = baseURL + options


    return $.get(url)
    // return fetch(url)
    //   .then(function (res) {
    //     // Pass the parsed json data to the next .then in the chain
    //     return res.json() // Returns a promise object that must be resolved to get to the data
    //   })
  }



  function storeWeatherData() {
   
     const storedData = localStorage.getItem('currentWeatherData')

     if (!storedData) {
       console.log("no data found")

     }

     const storedWeatherData = JSON.parse(storedData)
  }



function outputWeatherData() {

}




weatherSubmit.addEventListener('click', function(event) {
    event.preventDefault()

    
    const cityName = document.querySelector('#weatherInput').value
    
    if (cityName) {
        getCurrentWeatherByCity(cityName).then(() => {
            storeWeatherData()
        })
    }else {
        console.log("please enter a city name")
    }

})









