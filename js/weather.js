const API_KEY = "51d0772ba951b254bef717f872899c0b";

async function getWeather(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return await response.json();
}

async function getForecast(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return await response.json();
}

async function displayWeather(city) {
    const weatherData = await getWeather(city);
    const forecastData = await getForecast(city);

    const date = new Date().toLocaleDateString();
    document.querySelector("#city").textContent = weatherData.name;
    document.querySelector("#date").textContent = date;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
    document.querySelector("#temperature").textContent = weatherData.main.temp.toFixed(1);
    document.querySelector("#humidity").textContent = weatherData.main.humidity;
    document.querySelector("#wind-speed").textContent = weatherData.wind.speed.toFixed(1);

    const forecastList = forecastData.list;
    const forecastRow = document.getElementById("forecast-row");
    forecastRow.innerHTML = '';

    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const temperature = forecast.main.temp.toFixed(1);
        const humidity = forecast.main.humidity;

        const forecastCol = `
        <div class="col-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${date}</h5>
                    <img src="${icon}" alt="weather icon">
                    <p class="card-text">Temperature: ${temperature}°C</p>
                    <p class="card-text">Humidity: ${humidity}%</p>
                </div>
            </div>
        </div>
        `;

        forecastRow.innerHTML += forecastCol;
    }
}

document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("search-input").value;
    displayWeather(city);
});
// Display the weather for London by default
displayWeather("London");