# Weather Dashboard App

A responsive weather dashboard built with HTML, CSS, and vanilla JavaScript.

The application allows users to search for a city and view live weather information using the OpenWeatherMap API.

## Features

- Search weather by city name
- Live weather data from OpenWeatherMap
- Current temperature
- Weather condition and icon
- Feels-like temperature
- Humidity
- Wind speed
- Loading indicator while weather data is being fetched
- Error messages for invalid cities and failed requests
- Responsive design for mobile and desktop

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- async/await
- OpenWeatherMap API

## API Key Setup

This project requires an OpenWeatherMap API key.

1. Create an account at OpenWeatherMap.
2. Obtain an API key from your OpenWeatherMap account.
3. Open the `js` folder.
4. Copy `config.example.js`.
5. Rename the copy to `config.js`.
6. Open `config.js`.
7. Replace:

   const WEATHER_API_KEY = "YOUR_API_KEY_HERE";

   with your own OpenWeatherMap API key.

Example:

   const WEATHER_API_KEY = "YOUR_REAL_API_KEY";

The `config.js` file is excluded from Git using `.gitignore`, so the API key is not committed to the repository.

## Running the Application

After configuring the API key:

1. Open the project folder.
2. Open `index.html` in a web browser.
3. Enter a city name.
4. Click Search to view the current weather.

## Project Structure

weather-dashboard/
- index.html
- README.md
- .gitignore
- css/
  - style.css
- js/
  - config.example.js
  - script.js
- screenshots/

## Author

Elie