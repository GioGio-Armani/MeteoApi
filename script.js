const api = {
  key: "87c142b103ccea4c035d943bd3402a9b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector("#search-box");
const btn = document.querySelector("button");
const pays = document.querySelector("#country");

const rowPreview = document.querySelector(`.row-previews`);
const row = document.querySelector(`.row`);

searchbox.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    setQuery(searchbox.value);
  }
});

btn.addEventListener("click", setQuery);

function setQuery(evt) {
  if (searchbox.value === "") {
    alert("Veuillez entrer une ville");
  } else if (pays.value === "") {
    alert("Veuillez Choisir un pays");
  } else {
    getResults(searchbox.value, pays.value);
    console.log(searchbox.value);
  }
}

function getResults(query, country) {
  fetch(
    `${api.base}forecast?q=${query},${country}&lang=fr&units=metric&appid=${api.key}&cnt=8`
  )
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
  row.style.margin = "20px 0";
  let city = document.querySelector("#ville");
  city.innerHTML = `${weather.city.name}, ${weather.city.country}`;

  let now = new Date();
  let firstDate = new Date(weather.list[0].dt_txt);

  let hour = firstDate.getHours("fr-FR");
  let date = document.querySelector("#date");

  date.innerHTML = `${dateBuilder(now)} ${hour}h `;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(weather.list[0].main.temp)}°C`;

  let weather_el = document.querySelector("#description");
  weather_el.innerHTML = weather.list[0].weather[0].description;

  let rain = document.querySelector(".rain");
  rain.innerHTML = `Précipitation : ${weather.list[0].pop * 100} %`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidité : ${weather.list[0].main.humidity}%`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `Vent : ${weather.list[0].wind.speed} km/h`;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png"/>`;

  for (let i = 0; i < 8; i++) {
    let col = document.createElement("div");
    col.classList.add("preview");
    let heure = document.createElement("div");
    heure.classList.add("heure");
    let icon = document.createElement("div");
    icon.classList.add("icon");
    let temp = document.createElement("div");
    temp.classList.add("temp");

    let date = new Date(weather.list[i].dt_txt);
    let hour = date.getHours("fr-FR");
    let minutes = date.getMinutes("fr-FR");
    let day = date.getDate();

    heure.innerHTML = `${hour}:${minutes}`;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}.png"/>`;
    temp.innerHTML = `${Math.round(weather.list[i].main.temp)}°C`;

    col.appendChild(heure);
    col.appendChild(icon);
    col.appendChild(temp);

    rowPreview.appendChild(col);
  }

  searchbox.value = "";
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
  return `${day}`;
}
