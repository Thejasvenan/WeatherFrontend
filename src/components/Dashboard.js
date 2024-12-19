import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Include CSS file

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getWindDirection = (angle) => {
    if (angle >= 337.5 || angle < 22.5) return "N";
    if (angle >= 22.5 && angle < 67.5) return "NE";
    if (angle >= 67.5 && angle < 112.5) return "E";
    if (angle >= 112.5 && angle < 157.5) return "SE";
    if (angle >= 157.5 && angle < 202.5) return "S";
    if (angle >= 202.5 && angle < 247.5) return "SW";
    if (angle >= 247.5 && angle < 292.5) return "W";
    return "NW";
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setWeatherData(null);
  
    try {
      const response = await axios.get("https://weatherstation-backend-76068a291fbb.herokuapp.com/api/weather/current");
  
      console.log("API Response:", response.data); // Log the response for debugging
  
      if (response.data) {
        // Assume it's an object for now; update according to your backend response
        setWeatherData(response.data);
      } else {
        throw new Error("No data received. ESP32 might be offline.");
      }
    } catch (err) {
      console.error("Fetch Error:", err); // Log the error for debugging
  
      if (err.response) {
        setError(
          err.response.status === 404
            ? "No data available. ESP32 might not be connected."
            : "Server error occurred. Please try again later."
        );
      } else if (err.request) {
        setError("No response from the server. Please check the connection.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const windDirection = weatherData ? getWindDirection(weatherData.wind_direction || 0) : "N/A";
  const windAngle = weatherData ? weatherData.wind_direction : 0;

  const windArrowStyle = {
    transform: `rotate(${windAngle}deg)`,
    transition: "transform 0.5s ease",
  };

  return (
    <div>
      <h1 className="weather-heading">Weather Station Dashboard</h1>

      {loading && <p>Loading data...</p>}

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && weatherData && (
        <div className="chart-container">
          <h2 className="section-heading">Current Weather Data</h2>
          <p><strong>Temperature:</strong> {weatherData.temperature} °C</p>
          <p><strong>Pressure:</strong> {weatherData.pressure} hPa</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind_speed} m/s</p>

          {/* Compass with Wind Direction */}
          <div>
            <p><strong>Wind Direction:</strong> {windDirection} ({weatherData.wind_direction}°)</p>
            <div style={{ position: "relative", width: "150px", height: "150px", margin: "auto" }}>
              {/* Compass Circle */}
              <svg viewBox="0 0 100 100" width="150" height="150">
                <circle cx="50" cy="50" r="48" stroke="gray" strokeWidth="2" fill="none" />

                {/* Compass Labels */}
                <text x="50" y="12" textAnchor="middle" fontSize="8" fill="black">N</text>
                <text x="50" y="95" textAnchor="middle" fontSize="8" fill="black">S</text>
                <text x="7" y="52" textAnchor="middle" fontSize="8" fill="black">W</text>
                <text x="94" y="52" textAnchor="middle" fontSize="8" fill="black">E</text>
              </svg>

              {/* Wind Arrow */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                <svg viewBox="0 0 100 100" width="150" height="150" style={windArrowStyle}>
                  <line x1="50" y1="50" x2="50" y2="15" stroke="black" strokeWidth="3" />
                  <polygon points="45,15 55,15 50,5" fill="black" />
                </svg>
              </div>
            </div>
          </div>

          <p><strong>UV Index:</strong> {weatherData.uv_index}</p>
          <p><strong>Light Intensity:</strong> {weatherData.light_intensity} lx</p>
        </div>
      )}

      {!loading && !error && !weatherData && (
        <p className="error-message">No data available. Please check the ESP32 connection.</p>
      )}
    </div>
  );
};

export default Dashboard;
