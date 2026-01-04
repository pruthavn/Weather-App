import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ForecastPage.css';

function ForecastPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const groupedForecast = location.state?.groupedForecast;

  if (!groupedForecast) {
    return (
      <div>
        <p>No forecast data found. Please go back and search a location first.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  // Map weather conditions to your custom icons
  const weatherIcons = {
    Clear: '/sun.png',       
    Clouds: '/clouds.png',
    Rain: '/rain.png',
    Snow: '/snow.png',
    Thunderstorm: '/thunderstorm.png',
    Drizzle: '/drizzle.png',
    Mist: '/mist.png',
    Night: '/night.png',   
    Haze: '/haze.png',
    Fog: '/fog.png',
    Smoke: '/smoke.png',
    Squall: '/squall.png',
    Ash: '/ash.png',
    Tornado: '/tornado.png',
  };

  // Function to determine if it's night based on forecast time
  const isNight = (timeStr) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    return hour >= 18 || hour < 6; // 6 PM to 6 AM as night
  };

  return (
    <div
      style={{
        backgroundImage: "url('/weather.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="five-day-page"
    >
      <h2 style={{ color: '#fff' }} className="heading">5-Day Forecast</h2>

      {Object.keys(groupedForecast).map((date, index) => (
        <div key={index} className="day-block">
          <h3 style={{ color: '#fff' }} className="day-heading">{date}</h3>

          <div className="day-cards-horizontal">
            {groupedForecast[date].map((item, idx) => {
              const time = item.dt_txt.split(" ")[1].slice(0, 5);
              const night = isNight(time);
              const iconKey = night ? 'Night' : item.weather[0].main;

              return (
                <div key={idx} className="forecast-card">
                  <p className="time">{time}</p>

                  <img
                    src={weatherIcons[iconKey] || '/default.png'}
                    alt={item.weather[0].description}
                    className="weather-icon"
                    style={{ width: '40px', height: '40px' }}
                  />

                  <p className="temp">{Math.round(item.main.temp)}°C</p>
                  <p className="desc">{item.weather[0].description}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="bottom-btn">
        <button className='go-back' onClick={() => navigate('/')}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ForecastPage;
