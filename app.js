const express = require('express');
require('fetch');
const fs = require('fs');
const app = express();

const API_KEY = "ecc9f5c2614344f8a5451323242406";

app.get('/weather-forecast', async (req, res) => {
  const apiUrl = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}&q=18.4085,77.6593&num_of_days=10&tp=3&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extracting relevant data for each day
    const formattedData = data.data.weather.map(day => ({
      tempF: day.maxtempF,
      windspeed: day.hourly[0].windspeedKmph,
      humidity: day.hourly[0].humidity,
      pressure: day.hourly[0].pressure,
      sunrise: day.astronomy[0].sunrise,
      sunset: day.astronomy[0].sunset,
      moonrise: day.astronomy[0].moonrise,
      moonset: day.astronomy[0].moonset,
      date: day.date,
      cloudcover: day.hourly[0].cloudcover
    }));

    // Write the formatted data to a JSON file
   
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedData);

  } catch (error) {
    res.status(500).json({ message: "Error fetching weather forecast" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
