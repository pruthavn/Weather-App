import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WeatherDashboard from "./components/WeatherDashboard";
import ForecastPage from './ForecastPage';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [groupedForecast, setGroupedForecast] = useState({});
  const navigate = useNavigate();

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=ecca938fe3f7e1c0bc6e2ed0296c2128`;

  const searchLocation = (Event) => {
    if (Event.key === "Enter" && location !== "") {
      axios.get(forecastUrl)
        .then((Response) => {
          setData(Response.data);
          // Group forecast by date
          const list = Response.data.list;
          const groups = {};
          list.forEach(entry => {
            const date = entry.dt_txt.split(" ")[0];
            if (!groups[date]) groups[date] = [];
            groups[date].push(entry);
          });
          setGroupedForecast(groups);
        })
        .catch(err => console.log(err));
      setLocation('');
    }
  };

  const goToForecastPage = () => {
    navigate('/forecast', { state: { groupedForecast } });
  };

  const goToFarmerDashboard = () => {
    navigate('/farmer-dashboard');
  };

  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={
        <div
          style={{
            backgroundImage: "url('/weather.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
          }}
          className="app"
        >
          {/* Location Name */}
          <div className="location">
            <p className='loc-name'>{data.city?.name}</p>
            <p>FEELS LIKE {data.list?.[0]?.main?.feels_like?.toFixed()}°C</p>
          </div>

          {/* Search Box */}
          <div className="search">
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={searchLocation}
              type="text"
              placeholder="Enter Location"
            />
          </div>

          {/* Weather Cards */}
          <div className="weather-data">
            <div className="card temperature-card">
              <div className="card-title">Temperature</div>
              <div className="card-value">{data.list?.[0]?.main?.temp?.toFixed()}°C</div>
            </div>
            <div className="card humidity-card">
              <div className="card-title">Humidity</div>
              <div className="card-value">{data.list?.[0]?.main?.humidity}%</div>
            </div>
            <div className="card rain-card">
              <div className="card-title">Rain Probability</div>
              <div className="card-value">{(data.list?.[0]?.pop ?? 0) * 100}%</div>
            </div>
            <div className="card wind-card">
              <div className="card-title">Wind Speed</div>
              <div className="card-value">{data.list?.[0]?.wind?.speed?.toFixed()} m/s</div>
            </div>
          </div>

          {/* Buttons */}
          {Object.keys(groupedForecast).length > 0 && (
            <div className="forecast-btn-container">
              <button className="forecast-btn" onClick={goToForecastPage}>
                View 5-Day Forecast
              </button>
            </div>
          )}

          <button className="forecast-btn" onClick={goToFarmerDashboard}>
            Go to Farmer Dashboard
          </button>
        </div>
      } />

      {/* Forecast Page */}
      <Route path="/forecast" element={<ForecastPage />} />

      {/* Farmer Dashboard */}
      <Route path="/farmer-dashboard" element={<WeatherDashboard />} />
    </Routes>
  );
}

export default App;
