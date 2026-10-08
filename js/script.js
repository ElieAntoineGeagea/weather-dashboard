const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const inputError = document.getElementById("input-error");

const loadingSection = document.getElementById("loading");
const errorSection = document.getElementById("error");
const errorMessage = document.getElementById("error-message");
const weatherResult = document.getElementById("weather-result");

const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        inputError.textContent = "Please enter a city name.";
        return;
    }

    inputError.textContent = "";

    getWeather(city);
});

async function getWeather(city) {
    showLoading();

    try {
        const location = await getCoordinates(city);

        if (!location) {
            throw new Error("City not found. Please check the city name and try again.");
        }

        const weatherData = await getCurrentWeather(
            location.lat,
            location.lon
        );

        renderWeather(weatherData, location);
    } catch (error) {
        showError(error.message);
    }
}

async function getCoordinates(city) {
    const geocodingUrl =
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${WEATHER_API_KEY}`;

    const response = await fetch(geocodingUrl);

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
        }

        if (response.status === 429) {
            throw new Error("Too many requests. Please wait and try again.");
        }

        throw new Error("Unable to search for the city.");
    }

    const data = await response.json();

    if (data.length === 0) {
        return null;
    }

    return data[0];
}

async function getCurrentWeather(lat, lon) {
    const weatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

    const response = await fetch(weatherUrl);

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
        }

        if (response.status === 429) {
            throw new Error("Too many requests. Please wait and try again.");
        }

        throw new Error("Unable to load weather data.");
    }

    return await response.json();
}

function renderWeather(data, location) {
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    cityName.textContent =
        `${location.name}, ${location.country}`;

    weatherDescription.textContent = description;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.alt =
        `${description} weather icon`;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    windSpeed.textContent =
        `${data.wind.speed} m/s`;

    loadingSection.hidden = true;
    errorSection.hidden = true;
    weatherResult.hidden = false;
}

function showLoading() {
    loadingSection.hidden = false;
    errorSection.hidden = true;
    weatherResult.hidden = true;
}

function showError(message) {
    loadingSection.hidden = true;
    weatherResult.hidden = true;

    errorMessage.textContent = message;
    errorSection.hidden = false;
}