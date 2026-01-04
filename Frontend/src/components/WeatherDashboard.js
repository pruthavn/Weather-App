
import './WeatherDashboard.css';
import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const WeatherDashboard = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [advisories, setAdvisories] = useState([]);

  const fetchWeather = async () => {
    if (!location) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/weather?location=${location}`);
      setWeather(res.data.weatherData);
      setAdvisories(res.data.advisories);
    } catch (err) {
      console.error(err);
      alert("Error fetching weather");
    }
  };

  const getChartData = () => {
    if (!weather) return {};
    return {
      labels: weather.forecast.map(f => new Date(f.date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    hour12: true
  })
),
      datasets: [
        {
          label: "Temperature (°C)",
          data: weather.forecast.map(f => f.temp),
          borderColor: "#12727eff",
          backgroundColor: "#12727eff",
        },
        {
          label: "Rain Probability (%)",
          data: weather.forecast.map(f => f.rainProbability),
          borderColor: "#C2185B",
          backgroundColor: "#C2185B",
        },
      ],
    };
  };

  
function generateAdvisories(weather) {
  const advisories = [];

  // RULE 1: Rain Probability > 60%
  if (weather.rainProbability > 60) {
    advisories.push("Avoid irrigation and pesticide spraying today due to high rain probability.");
  }

  // RULE 2: High Temperature (> 35°C)
  if (weather.temperature > 35) {
    advisories.push("Increase irrigation frequency for heat-sensitive crops.");
  }

  // RULE 3: Wind Speed > 15 km/h
  if (weather.windSpeed > 15) {
    advisories.push("Do not spray pesticides — strong winds may cause drift.");
  }

  // RULE 4: High Humidity (> 80%)
  if (weather.humidity > 80) {
    advisories.push("High humidity increases fungal infection risk. Monitor crops closely.");
  }

  // RULE 5: Good Spraying Window (wind < 10 km/h & no rain in next 6 hours)
  const noRainNext6Hours = weather.forecast
    .slice(0, 2)     // next 6 hours = first two 3-hour blocks
    .every(f => f.rainProbability < 20);

  if (weather.windSpeed < 10 && noRainNext6Hours) {
    advisories.push("Good spraying window — low wind and no expected rain.");
  }

  return advisories;
}

  return (
    <div className="dashboard-container">
      <h2>Farmer Weather Dashboard</h2>
     
      <form
  onSubmit={(e) => {
    e.preventDefault();
    if (location.trim()) fetchWeather();
  }}
>
  <div className="search-container">
    <input
      type="text"
      placeholder="Enter city"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <button type="submit" disabled={!location.trim()}>
      Get Weather
    </button>
  </div>
</form>


      {weather && (
        <>
          <div className="weather-info">
            <div className="card">Temperature: {weather.temperature}°C</div>
            <div className="card">Humidity: {weather.humidity}%</div>
            <div className="card">Wind: {weather.windSpeed} km/h</div>
            <div className="card">Rain: {weather.rainProbability}%</div>
          </div>

         <h4 className="forecast-title">Forecast (Next 5 days, 3-hour Blocks)</h4>

          <div className="chart-container">
            <Line  data={getChartData()}
  options={{
  scales: {
    x: {
      ticks: {
        padding: 20,
        font: {
          size: 14,
          weight: "bold",
        },
        color: "black",   // axis label color
      },
      grid: { display: false },
    },
    y: {
      ticks: {
        padding: 20,
        font: {
          size: 14,
          weight: "bold",
        },
        color: "",
      },
      grid: { display: false },
    }
  }
}}
 />
          </div>

          <h4>Advisories</h4>
          <div className="advisory-box">
            {advisories.map((adv, idx) => (
              <p key={idx}>{adv}</p>
            ))}
          </div>
        </>
      )}
    </div>
  

  );

};

export default WeatherDashboard;
