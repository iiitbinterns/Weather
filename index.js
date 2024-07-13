const express = require('express');
require('fetch');
const app = express();

const API_KEY = "c47832a6c868fbb3cff238f3323a4086"; // Replace 'your_api_key' with your actual API key from OpenWeatherMap

app.get('/weather-forecast', async (req, res) => {
  const { q } = req.query; // Extract the city name from the query parameters
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${API_KEY}`; // Change the API endpoint to fetch 3-hour predicted metrics

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract the 3-hour predicted metrics for the present day
    const presentDayForecast = data.list.filter(item => {
      const date = new Date(item.dt * 1000);
      const today = new Date();
      return date.getDate() === today.getDate();
    });

    // Send the present day forecast data as the response
    res.json(presentDayForecast);

  } catch (error) {
    res.status(500).json({ message: "Error fetching weather forecast" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
