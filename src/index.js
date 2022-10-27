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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  let tempMax = document.querySelector("#max-temp");
  let temperatureMax = Math.round(response.data.main.temp_max);
  tempMax.innerHTML = `${temperatureMax}`;
  let tempMin = document.querySelector("#min-temp");
  let temperatureMin = Math.round(response.data.main.temp_min);
  tempMin.innerHTML = `${temperatureMin}`;
  let description = document.querySelector(".image-word");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity-now");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
  let windDeg = document.querySelector("#wind-deg");
  windDeg.innerHTML = response.data.wind.deg;
  let pressure = document.querySelector("#pressure-now");
  pressure.innerHTML = response.data.main.pressure;
  let vis = document.querySelector("#visibility-now");
  vis.innerHTML = response.data.visibility;
  let citySearch = document.querySelector("#city");
  citySearch.innerHTML = `${response.data.name.toUpperCase()}`;
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

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", handleCity);

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
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function tempF(temp) {
  temp.preventDefault();
  let far = currentTemperature * 1.8 + 32;
  temperatureElement.innerHTML = `${Math.round(far)}`;
}
let temperatureChange = document.querySelector(".farengeit");
temperatureChange.addEventListener("click", tempF);

function tempC(temp) {
  temp.preventDefault();
  temperatureElement.innerHTML = `${currentTemperature}`;
}
let temperatureChangeC = document.querySelector(".celsius");
temperatureChangeC.addEventListener("click", tempC);
