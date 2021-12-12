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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
						<div class="col-2"><div class="weatherForecastDate">
							${day}
						</div>
											<img src="http://openweathermap.org/img/wn/50d@2x.png"
											alt=""
											width="42"
											/> <br><div class="weatherForecastTemp"> <span class="weatherForecastMax">18°</span>
											<span class="weatherForecastMin">12°</span> </div>
											</div>
											
										
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
displayForecast();
