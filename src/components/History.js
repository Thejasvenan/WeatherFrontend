import React, { useState, useEffect, useCallback } from "react";
import { fetchSensorData } from "../api";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../App.css"; // Include CSS file

const History = () => {
  // Separate states for each chart
  const [temperatureData, setTemperatureData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [windSpeedData, setWindSpeedData] = useState([]);
  const [windDirectionData, setWindDirectionData] = useState([]);
  const [uvIndexData, setUvIndexData] = useState([]);
  const [lightIntensityData, setLightIntensityData] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setError("");
    try {
      const response = await fetchSensorData();
      
      if (response.data && response.data.length > 0) {
        const sortedData = response.data.sort((a, b) => b.id - a.id).slice(0, 25);

        // Update only if data has changed for each specific field
        setTemperatureData((prev) =>
          JSON.stringify(prev) !== JSON.stringify(sortedData.map((d) => ({ timestamp: d.timestamp, value: d.temperature })))
            ? sortedData.map((d) => ({ timestamp: d.timestamp, value: d.temperature }))
            : prev
        );

        setPressureData((prev) =>
          JSON.stringify(prev) !== JSON.stringify(sortedData.map((d) => ({ timestamp: d.timestamp, value: d.pressure })))
            ? sortedData.map((d) => ({ timestamp: d.timestamp, value: d.pressure }))
            : prev
        );

        setWindSpeedData((prev) =>
          JSON.stringify(prev) !== JSON.stringify(sortedData.map((d) => ({ timestamp: d.timestamp, value: d.wind_speed })))
            ? sortedData.map((d) => ({ timestamp: d.timestamp, value: d.wind_speed }))
            : prev
        );

        setWindDirectionData((prev) =>
          JSON.stringify(prev) !== JSON.stringify(sortedData.map((d) => ({ timestamp: d.timestamp, value: d.wind_direction })))
            ? sortedData.map((d) => ({ timestamp: d.timestamp, value: d.wind_direction }))
            : prev
        );

        setUvIndexData((prev) =>
          JSON.stringify(prev) !== JSON.stringify(sortedData.map((d) => ({ timestamp: d.timestamp, value: d.uv_index })))
            ? sortedData.map((d) => ({ timestamp: d.timestamp, value: d.uv_index }))
            : prev
        );

        setLightIntensityData((prev) =>
          JSON.stringify(prev) !== JSON.stringify(sortedData.map((d) => ({ timestamp: d.timestamp, value: d.light_intensity })))
            ? sortedData.map((d) => ({ timestamp: d.timestamp, value: d.light_intensity }))
            : prev
        );
      } else {
        throw new Error("No historical data available.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll for new data every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fetchData]);

  const createChartData = (data, label, borderColor, backgroundColor) => ({
    labels: data.map((item) => new Date(item.timestamp).toLocaleString()),
    datasets: [
      {
        label: label,
        data: data.map((item) => item.value),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: true,
        tension: 0.4,
      },
    
    ],
    options: {

      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
    },
  });

  return (
    <div>
      <h1 className="weather-heading">Weather Data History</h1>

      {loading && <p className="loading">Loading data...</p>}
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="chart-container">
            <h2 className="section-heading">Temperature</h2>
            <Line
              data={createChartData(temperatureData, "Temperature (°C)", "#ff6f61", "#ffcccb")}
            />
          </div>

          <div className="chart-container">
            <h2 className="section-heading">Pressure</h2>
            <Line
              data={createChartData(pressureData, "Pressure (hPa)", "#00796b", "#b2dfdb")}
            />
          </div>

          <div className="chart-container">
            <h2 className="section-heading">Wind Speed</h2>
            <Line
              data={createChartData(windSpeedData, "Wind Speed (m/s)", "#ffa726", "#ffe0b2")}
            />
          </div>

          <div className="chart-container">
            <h2 className="section-heading">Wind Direction</h2>
            <Bar
              data={createChartData(windDirectionData, "Wind Direction (°)", "#5c6bc0", "#c5cae9")}
            />
          </div>

          <div className="chart-container">
            <h2 className="section-heading">UV Index</h2>
            <Line
              data={createChartData(uvIndexData, "UV Index", "#8e24aa", "#e1bee7")}
            />
          </div>

          <div className="chart-container">
            <h2 className="section-heading">Light Intensity</h2>
            <Line
              data={createChartData(lightIntensityData, "Light Intensity (lx)", "#4caf50", "#c8e6c9")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default History;
