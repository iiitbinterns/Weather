const express = require('express');
require('fetch');
const app = express();

const API_KEY = "62085a6c48e03e4f1f9e65754a888a34"; // Replace 'your_api_key' with your actual API key from OpenWeatherMap

app.get('/weather-forecast', async (req, res) => {
  const { lat, lon } = req.query; // Extract the latitude and longitude from the query parameters
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; // Include units=metric to get temperature in Celsius

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract the required weather metrics
    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainy: data.weather[0].main === 'Rain' ? true : false,
      cloudy: data.weather[0].main === 'Clouds' ? true : false
    };

    // Send the weather data as the response
    res.json(weatherData);

  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






