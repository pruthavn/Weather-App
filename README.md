# Farmer Weather Advisory System (MERN-Style Web Application)

A Weather Advisory Web Application built using React.js and Node.js + Express, designed to assist farmers by providing real-time weather information and rule-based agricultural advisories using data from OpenWeatherMap API. 

**Project Objectives:**
- Provide accurate, real-time weather data for any location
- Generate simple, rule-based advisories for farmers
- Help reduce crop damage caused by weather conditions
- Present data using a clean and user-friendly interface

**Features**
- Weather Data Fetching
- Search weather by location name
- Fetches data from OpenWeatherMap API

**Displays**

🌡️ Temperature

💧 Humidity

🌧️ Rain Probability (POP)

💨 Wind Speed

📅 5-Day Forecast (3-hour intervals)

### Farmer Advisory Logic (Rule-Based)

After fetching weather data, the application generates agricultural advisories using predefined logical rules.

**Implemented advisory rules include:**

🌧️ Rain Probability > 60%
→ Avoid irrigation and pesticide spraying today.

🔥 High Temperature (> 35°C)
→ Increase irrigation frequency for heat-sensitive crops.

💨 Wind Speed > 15 km/h
→ Avoid pesticide spraying due to drift risk.

💦 High Humidity (> 80%)
→ Possible fungal infection; monitor crop health.

✅ Good Spraying Window
→ Wind speed < 10 km/h and no rain expected in the next 6 hours.

### 📊 Data Visualization & UI
- Displays basic weather metrics
- Shows temperature and rainfall trends using charts
- Advisories are displayed in an alert box
- Responsive and farmer-friendly UI

### 🛠️ Tech Stack
**Frontend**

- React.js
- JavaScript
- CSS
- Chart.js

**Backend**

- Node.js
- Express.js
- REST API
- External API
- OpenWeatherMap API
