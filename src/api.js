import axios from 'axios';

const API = axios.create({
  baseURL: 'https://df23-2401-dd00-10-20-7c10-b7d3-5f7e-f3da.ngrok-free.app/api',
});

export const fetchSensorData = () => API.get('/sensor-data');
