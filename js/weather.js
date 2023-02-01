// weather.js
const API_KEY = "51d0772ba951b254bef717f872899c0b";

// function to get weather information for a specific city
async function getWeather(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}

// function to get forecast information for a specific city
async function getForecast(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}
