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

<img width="1917" height="992" alt="first_interface" src="https://github.com/user-attachments/assets/48608c2a-2de3-4eaf-93e8-a04d3b3f93b5" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------
<img width="1918" height="991" alt="weather location" src="https://github.com/user-attachments/assets/17c9b7c2-cbe0-4767-b300-ef865ad6573c" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------
<img width="1920" height="2051" alt="5 day forecast" src="https://github.com/user-attachments/assets/6bc3d3c4-912d-421b-a810-34b19b083aa4" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------
<img width="1916" height="992" alt="weather dashboard" src="https://github.com/user-attachments/assets/7e47811f-d5d6-4ce4-a71f-f5a68e8700a0" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------
<img width="1920" height="1248" alt="weather advisory" src="https://github.com/user-attachments/assets/2f5b4c8c-1d80-4c2f-bfe3-b014ef7a2ee6" />





