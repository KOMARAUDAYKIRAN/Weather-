const apiKey = "YOUR_API_KEY"; // 🔑 Replace with OpenWeatherMap API key

document.getElementById("city").addEventListener("keyup", function(event) {
  if (event.key === "Enter") getWeather();
});

async function getWeather() {
  const city = document.getElementById("city").value;
  const weatherDiv = document.getElementById("weatherResult");
  const forecastDiv = document.getElementById("forecast");
  const loader = document.getElementById("loader");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  loader.classList.remove("hidden");
  weatherDiv.innerHTML = "";
  forecastDiv.innerHTML = "";

  try {
    // Current Weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherRes.json();

    // Forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastRes.json();

    displayWeather(weatherData);
    displayForecast(forecastData);
    changeBackground(weatherData.weather[0].main);

  } catch (error) {
    weatherDiv.innerHTML = "<p>Error fetching weather data.</p>";
  }

  loader.classList.add("hidden");
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${icon}" alt="icon">
    <p><strong>${data.weather[0].main}</strong> (${data.weather[0].description})</p>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind: ${data.wind.speed} m/s</p>
  `;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyData.forEach(day => {
    const date = new Date(day.dt_txt).toDateString();
    const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <p>${date}</p>
        <img src="${icon}">
        <p>${day.main.temp}°C</p>
      </div>
    `;
  });
}

function changeBackground(weather) {
  const body = document.body;
  if (weather.includes("Cloud")) body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
  else if (weather.includes("Rain")) body.style.background = "linear-gradient(to right, #3a6073, #16222a)";
  else if (weather.includes("Clear")) body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
  else body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
}
