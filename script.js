const api = {
  key: "87c142b103ccea4c035d943bd3402a9b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector("#search-box");
const btn = document.querySelector("#search-button");

searchbox.addEventListener("keypress", setQuery);
btn.addEventListener("click", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&lang=fr&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((weather) => {
      if (weather.cod === "404") {
        alert("Ville non trouvée");
      } else {
        displayResults(weather);
      }
    });
}

function displayResults(weather) {
  console.log(weather);
  let meteoBox = document.querySelector("#meteo");
  meteoBox.style.padding = "20px";
  let city = document.querySelector("#ville");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector("#date");

  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

  let weather_el = document.querySelector("#description");
  weather_el.innerHTML = weather.weather[0].description;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${weather.main.humidity}%`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${weather.wind.speed} km/h`;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/>`;
}

function dateBuilder(d) {
  let months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septemebre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  let days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudie",
    "Vendredi",
    "Samedi",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
