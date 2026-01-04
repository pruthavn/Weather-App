const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Weather + Advisory endpoint
router.get('/weather', async (req, res) => {
    const location = req.query.location;
    if (!location) return res.status(400).json({ error: "Location required" });

    try {
        const apiKey = process.env.OPENWEATHER_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
        const response = await axios.get(weatherUrl);
        const data = response.data;

        // Take next 24 hours (8 blocks × 3 hours)
        // Full forecast for 5 days
const allBlocks = data.list; // 40 × 3-hour blocks (~5 days)
const next24Hours = allBlocks.slice(0, 8); // first 8 blocks (24 hours)
const maxTemp = Math.max(...allBlocks.map(f => f.main.temp));
const maxWind = Math.max(...allBlocks.map(f => f.wind.speed));
const maxHumidity = Math.max(...allBlocks.map(f => f.main.humidity));
const maxRainProb = Math.max(...allBlocks.map(f => f.pop * 100));


        // Current weather (for dashboard display)
        const current = data.list[0];
        const weatherData = {
            city: data.city.name,
            country: data.city.country,
            temperature: current.main.temp,
            humidity: current.main.humidity,
            windSpeed: current.wind.speed,
            rainProbability: current.pop * 100,
            forecast: next24Hours.map(item => ({
                date: item.dt_txt,
                temp: item.main.temp,
                rainProbability: item.pop * 100
            }))
        };

        // Farmer Advisory Logic (24-hour based)
        const advisories = [];

if (maxRainProb > 60) {
    advisories.push("High rain probability expected. Avoid irrigation and spraying.");
}

if (maxTemp > 35) {
    advisories.push("High temperature expected. Increase irrigation frequency.");
}

if (maxWind > 15) {
    advisories.push("Strong winds expected. Avoid pesticide spraying.");
}

if (maxHumidity > 80) {
    advisories.push("High humidity may cause fungal infections. Monitor crops closely.");
}

if (advisories.length === 0) {
    advisories.push("Good spraying window: safe to spray pesticides.");
}

        // Good spraying window only if no warnings exist
        if (advisories.length === 0) {
            advisories.push("Good spraying window: safe to spray pesticides.");
        }

        // Send response (always!)
        res.json({ weatherData, advisories });

    }   catch (err) {
    console.log("========== WEATHER API ERROR ==========");
    console.log("Axios error message:", err.message);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("======================================");

    // CITY NOT FOUND (OpenWeather)
    if (
        err.response &&
        err.response.data &&
        err.response.data.cod === "404"
    ) {
        return res.status(404).json({ message: "City not found" });
    }

    // REAL SERVER ERROR
    return res.status(500).json({ message: "Error fetching weather" });
}



});

module.exports = router;
