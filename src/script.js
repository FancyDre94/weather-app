let now = new Date();
console.log(now);
let h2 = document.querySelector("h2");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hour} : ${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
						<div class="col-2">
            <div class="weatherForecastDate">
							${formatDay(forecastDay.dt)}
						</div>
            ${index}
											<img src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
											alt=""
											width="42"
											/> <br>
                      <div class="weatherForecastTemp"> 
                      <span class="weatherForecastMax">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
											<span class="weatherForecastMin">${Math.round(
                        forecastDay.temp.min
                      )}°</span> </div>
											</div>
											
										
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e7b34554a2a306cb3853f56f75043cae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  event.preventDefault();
  let search = document.querySelector("#city-input");
  let units = "imperial";
  let apiKey = "e7b34554a2a306cb3853f56f75043cae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
  console.log(response.data);
  let cityLocation = document.querySelector("#city");
  cityLocation.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#currentCityTemp");
  temp.innerHTML = `${Math.round(response.data.main.temp)}℉`;
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let weatherDiscriptionElement = document.querySelector("#weatherDiscription");
  weatherDiscription.innerHTML = response.data.weather[0].description;
  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function showPosition(position) {
  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e7b34554a2a306cb3853f56f75043cae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#currentLocation");
current.addEventListener("click", getCurrentPosition);
let searchResult = document.querySelector("#search-location");
searchResult.addEventListener("submit", showPosition);
let searchElement = document.querySelector("form");
searchElement.addEventListener("submit", searchCity);

let fahrenheitTemperature = null;
