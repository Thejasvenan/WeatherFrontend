# WeatherStation Frontend

This repository contains the frontend code for the Weather Station project. The Weather Station is an IoT-based application designed to monitor and display real-time weather data, including temperature, pressure, wind speed, wind direction, UV index, and light intensity. The frontend is built using React.js and deployed on Netlify.

## Features

- **Real-time Data Display**: Displays current weather parameters fetched from the backend API.
- **Wind Direction Visualization**: A compass with an animated arrow showing the wind direction.
- **Responsive Design**: Optimized for different screen sizes using Bootstrap.
- **Historical Data Access**: Allows viewing past weather data (optional feature if implemented).
- **Error Handling**: Provides user-friendly messages when the backend is unreachable or no data is available.

## Technologies Used

- **React.js**: Frontend framework.
- **Axios**: For API calls.
- **Bootstrap**: For styling and responsiveness.
- **Chart.js**: For visualizing historical data (if implemented).
- **Netlify**: Deployment platform.

## Installation

To set up and run the frontend locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/weatherstation-frontend.git
   cd weatherstation-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Deployment

This project is deployed on [Netlify](https://www.netlify.com/). To deploy your own version:

1. Push your code to a GitHub repository.
2. Connect your repository to Netlify.
3. In Netlify settings, set the build command to `npm run build` and the publish directory to `build/`.

## Backend Integration

The frontend interacts with the backend API to fetch weather data. Ensure the backend server is running and publicly accessible (e.g., hosted on Heroku or another cloud platform). Update the API URL in the `fetchData` function of the `Dashboard` component:

```javascript
const response = await axios.get("https://<your-backend-url>/api/weather/current");
```

## Configuration

If deploying on Netlify, ensure the following configuration:

- In the `package.json` file, add the homepage property:
  ```json
  "homepage": "/"
  ```

- Add a `_redirects` file in the `public/` directory with this content:
  ```
  /*    /index.html   200
  ```
  This ensures React's routing works correctly.

## Future Improvements

- Add WebSocket support for real-time updates.
- Enhance historical data visualization using Chart.js.
- Implement user authentication (optional).

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

