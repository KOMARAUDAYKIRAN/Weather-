const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value;
  const weatherDiv = document.getElementById("weatherResult");

  if (city === "") {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) {
      weatherDiv.innerHTML = "<p>City not found. Please try again.</p>";
      return;
    }

    const data = await res.json();
    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].main}</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = "<p>Error fetching weather data.</p>";
    console.error(error);
  }
}
