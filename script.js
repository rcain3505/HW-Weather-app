function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round (response.data.main.temp);
}

  let apiKey = " 1804ad44e9c16ffa43c0a000ff604023";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metrics`;
  
  axios.get(apiUrl).then(displayTemperature);
