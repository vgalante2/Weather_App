const baseURL = 'https://api.openweathermap.org/data/2.5'
const apiKey = 'e9621bce5c4f4f8785b30e2365e66bfb'


const weatherSubmit = document.querySelector('#weatherSubmit')


// GET WEATHER FUNCTION

function getCurrentWeatherByCity (cityName) {

const url = `${baseURL}/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  
 
console.log("The city is : " + cityName)

return $.get(url).then(function(weatherObj) {
      
    localStorage.setItem('currentWeatherData', JSON.stringify(weatherObj))
     
       console.log(weatherObj)
    }
)

}


function getForecastWeather(cityName) {
    const url = `${baseURL}/forecast?q=${cityName}&appid=${apiKey}&units=imperial`


    return $.get(url).then(function (forecast) {

        localStorage.setItem('forecastWeatherData', JSON.stringify(forecast))

       
        console.log(forecast);


    })
   
  }

//   STORAGE

  function storeWeatherData() {
   
     const storedData = localStorage.getItem('currentWeatherData')
    const  storedForecast = localStorage.getItem('forecastWeatherData')



     if (!storedData && !storedForecast) {
       console.log("no data found")

     }

     const weatherData = JSON.parse(storedData)
     const forecastData = JSON.parse(storedForecast)
     outputWeatherData(weatherData)
     outputForecast(forecastData)
  }

  



//   OUTPUT WEATHER DATA

function outputWeatherData(weatherData) {

    $('#city-name').text(`${weatherData.name}`);
    $('#current-temp').text(`Temp: ${weatherData.main.temp.toFixed(0)} °`);
    $('#wind-speed').text(`Wind: ${weatherData.wind.speed} mph`);
    $('#humidity').text(`Humidity: ${weatherData.main.humidity}%`);
    
    
    

}

function outputForecast(forecastData) {
    const forecastContainer = $('#forecast-container');
    forecastContainer.empty(); // Clear existing content

    // Slice the first 5 elements from the forecast list
    let firstFiveElements = forecastData.list.slice(0, 5);

    firstFiveElements.forEach(forecast => {
        // Assuming dayjs is already included in your project
        const formattedDate = dayjs(forecast.dt_txt).format('MMM D, YYYY');
        const time = dayjs(forecast.dt_txt).format('hh:mm A');

        // Append a div with the forecast details for each of the first 5 entries
        forecastContainer.append(`
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center;  flex-direction: column; padding: 5px; margin-right: 15px; border: 3px solid #519af9; border-radius: 15px;">
               <h1>Day: ${formattedDate}</h1>
               <p id="forecast-icon"><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon"></p>

                <p>Time: ${time}</p>
                <p id="forecast-temp">Temp: ${forecast.main.temp.toFixed(0)}°</p>
                <p>Wind: ${forecast.wind.speed} mph</p>
                <p id="forecast-humidity">Humidity: ${forecast.main.humidity}%</p>
            </div> 
        `);
    });
}





weatherSubmit.addEventListener('click', function(event) {
    event.preventDefault()
    
    
    const cityName = document.querySelector('#weatherInput').value
    
    if (cityName) {
        getCurrentWeatherByCity(cityName).then(() => {
            storeWeatherData(cityName)
        })
       

    }else {
        console.log("please enter a city name")
    }

    if (cityName) {
        getForecastWeather(cityName).then(() => {
            storeWeatherData(cityName)
    })
}

})









