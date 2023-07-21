const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/",
};
const searchbox = document.querySelector("#search-box");
const btn = document.querySelector("button");
const pays = document.querySelector("#country");

const rowPreview = document.querySelector(`.row-previews`);
const row = document.querySelector(`.row`);
let tempsTab = [];
let heureTab = [];

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

function getResults(ville, country) {
  fetch(
    `${api.base}forecast?q=${ville},${country}&lang=fr&units=metric&appid=${api.key}&cnt=9`
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
  meteoBox.classList.remove("hidden");
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

  rowPreview.innerHTML = "";

  for (let i = 1; i < 9; i++) {
    let col = document.createElement("div");
    col.classList.add("preview");
    // let heure = document.createElement("div");
    // heure.classList.add("heure");
    let icon = document.createElement("div");
    icon.classList.add("icon");
    let temp = document.createElement("div");
    temp.classList.add("temp");

    let date = new Date(weather.list[i].dt_txt);
    let hour = date.getHours("fr-FR");
    heureTab.push(hour + "h");
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = date.getMinutes("fr-FR");
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    // heure.innerHTML = `${hour}:${minutes}`;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}.png"/>`;
    temp.innerHTML = `${Math.round(weather.list[i].main.temp)}°C`;
    tempsTab.push(Math.round(weather.list[i].main.temp));

    // col.appendChild(heure);
    col.appendChild(icon);
    col.appendChild(temp);

    rowPreview.appendChild(col);
  }
  searchbox.value = "";
  CreateCourbe(heureTab, tempsTab);
}

function dateBuilder(d) {
  let days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  let day = days[d.getDay()];
  return `${day}`;
}
// courbe température chart.js //
Chart.defaults.font.size = 18;
function CreateCourbe(x, y) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            fontSize: 50,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
          beginAtZero: false,
        },
      },
    },
    data: {
      labels: x,
      datasets: [
        {
          data: y,
          fill: true,
          backgroundColor: ["#7fa6ca5b"],
          borderColor: ["#7fa6ca"],
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
  });
}
