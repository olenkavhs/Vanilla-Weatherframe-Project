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

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
      <div class="card">
        <div class="card-body">
          <h4>${day}</h4>
          <div class="date">Sep 12</div>
          <img
            src="image/sunny.png"
            class="small-image"
            alt="Weather image"
            width="50"
          />
          <div class="row">
            <div class="col-6 temp-forecast-max">18°C</div>
            <div class="col-6">10°C</div>
          </div>
        </div>
      </div>
    
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempMax = document.querySelector("#max-temp");
  let temperatureMax = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector("#min-temp");
  let temperatureMin = Math.round(response.data.main.temp_min);
  let description = document.querySelector(".image-word");
  let iconElement = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity-now");
  let windSpeed = document.querySelector("#wind-speed");
  let windDeg = document.querySelector("#wind-deg");
  let pressure = document.querySelector("#pressure-now");
  let vis = document.querySelector("#visibility-now");
  let citySearch = document.querySelector("#city");
  celsiusTemperature = response.data.main.temp;
  citySearch.innerHTML = `${response.data.name.toUpperCase()}`;
  temperatureElement.innerHTML = `${temperature}`;
  tempMax.innerHTML = `${temperatureMax}`;
  tempMin.innerHTML = `${temperatureMin}`;
  description.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  windDeg.innerHTML = response.data.wind.deg;
  pressure.innerHTML = response.data.main.pressure;
  vis.innerHTML = response.data.visibility;
  getForecast(response.data.coord);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retreivePosition);
}

function tempF(event) {
  event.preventDefault();

  let far = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = `${Math.round(far)}`;
  temperatureChangeC.classList.remove(`active`);
  temperatureChangeF.classList.add(`active`);
}

function tempC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temper-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  temperatureChangeC.classList.add(`active`);
  temperatureChangeF.classList.remove(`active`);
}
let temperatureChangeF = document.querySelector("#farengeit");
temperatureChangeF.addEventListener("click", tempF);
let celsiusTemperature = null;

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", handleCity);

let temperatureChangeC = document.querySelector("#celsius");
temperatureChangeC.addEventListener("click", tempC);
