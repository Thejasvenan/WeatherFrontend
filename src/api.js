import axios from 'axios';

const API = axios.create({
  baseURL: 'https://weatherstation-backend-76068a291fbb.herokuapp.com/api',
});

export const fetchSensorData = () => API.get('/sensor-data');
