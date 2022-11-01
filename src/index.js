let now = new Date();
let h2 = document.querySelector("h2");
function zeroFirst(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}
let date = now.getDate();
let hours = zeroFirst(now.getHours());
let minutes = zeroFirst(now.getMinutes());
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];
let month = months[now.getMonth()];
h2.innerHTML = `${day}, ${month} ${date}  ${hours}:${minutes}`;
let temperatureElement = document.querySelector(`#temper-now`);
let currentTemperature = temperatureElement.innerHTML;
let city = "Lviv";
let units = "metric";
let apiKey = "1d82369e7ab48bdd7fe7a319024125d8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

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
      <div class="card">
        <div class="card-body">
          <h4>${formatDay(forecastDay.time)}</h4>
           <img
            src=${forecastDay.condition.icon_url}
            class="small-image"
            alt="Weather image"
            width="70"
          />
          <div class="row">
            <div class="col-6 temp-forecast-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</div>
            <div class="col-6 temp-forecast-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</div>
          </div>
        </div>
      </div>
    
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `o3a69ab74905974ad5cf94debte8cfc8`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}
function displayIcon(response) {
  console.log(response);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
}
function getIcon(coordinates) {
  let apiKey = `o3a69ab74905974ad5cf94debte8cfc8`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayIcon);
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let tempMax = document.querySelector("#max-temp");
  let temperatureMax = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector("#min-temp");
  let temperatureMin = Math.round(response.data.main.temp_min);
  let description = document.querySelector(".image-word");

  let humidity = document.querySelector("#humidity-now");
  let windSpeed = document.querySelector("#wind-speed");
  let windDeg = document.querySelector("#wind-deg");
  let pressure = document.querySelector("#pressure-now");
  let vis = document.querySelector("#visibility-now");
  let citySearch = document.querySelector("#city");
  celsiusTemperature = response.data.main.temp;
  citySearch.innerHTML = `${response.data.name.toUpperCase()}`;
  temperatureElement.innerHTML = `${temperature}`;
  tempMax.innerHTML = `${temperatureMax}°`;
  tempMin.innerHTML = `${temperatureMin}°`;
  description.innerHTML = response.data.weather[0].description;

  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  windDeg.innerHTML = response.data.wind.deg;
  pressure.innerHTML = response.data.main.pressure;
  vis.innerHTML = response.data.visibility;
  getForecast(response.data.coord);
  getIcon(response.data.coord);
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

function changeCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  changeCity(city);
}

function retreivePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retreivePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", handleCity);
