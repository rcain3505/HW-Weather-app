function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
 
function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement= document.querySelector("#forecast");

    let forecastHTML = `<div  class="row">`;
   
    forecast.forEach(function(forecastDay){
   forecastHTML= 
    forecastHTML +
            `<div class="col-2">
      <div class="weather-forecast-date">${forecastDay.dt} </div>
            <img 
            src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt="" 
            width="36"
            />
            <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">${forecastDay.temp.max}°</span>
                    <span class="weather-forecast-temperature-min">${forecastDay.temp.min}°</span>
                  </div>
                </div>`;
 });
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML = forecastHTML;
            console.log(forecastHTML);
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unitsmetrics`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}


function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}


let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


searchCity("New York");
displayForecast();