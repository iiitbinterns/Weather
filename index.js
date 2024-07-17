const axios = require("axios");
const hourly = require("./hourly");
const mongoose = require("mongoose");

const url = "mongodb+srv://sindhuja:sindhuja@cluster0.tzhtz9r.mongodb.net/weather";
mongoose.connect(url)
    .then((res) => console.log("success"))
    .catch((err) => console.log(err));

const key = "62085a6c48e03e4f1f9e65754a888a34";
const lat = 17.14;
const lon = 78.4;

const fetchData = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`,{
            params: {
                lat: lat,
                lon: lon,
                appid: key,
                units: "metric",
            }
        });

        const data = response.data.list;
        const filteredData = data.slice(1, 10).map((entry) => ({
            time: new Date(entry.dt * 1000),
            temperature: entry.main.temp,}
        ));

        const weather = new hourly({ lat, lon, data:filteredData });
        console.log(weather);
        weather.save();
    }
    catch (error) {
        console.error(error);
    }
};

fetchData();
