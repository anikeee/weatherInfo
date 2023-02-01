const API_KEY = "51d0772ba951b254bef717f872899c0b";



// Get 5 day forecast
async function getForecast(city) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

// Display current weather
async function displayWeather(city) {
    const weatherData = await getWeather(city);

    const cityName = weatherData.name;
    console.log(cityName);
    const date = new Date().toLocaleDateString();
    const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    document.querySelector("#city-name").textContent = cityName;
    document.querySelector("#date").textContent = date;
    document.querySelector("#weather-icon").setAttribute("src", icon);
    document.querySelector("#temperature").textContent = temperature;
    document.querySelector("#humidity").textContent = humidity;
    document.querySelector("#wind-speed").textContent = windSpeed;
}

// Display 5 day forecast
async function displayForecast(city) {
    const forecastData = await getForecast(city);
    const forecastList = forecastData.list;

    let forecastHTML = "";

    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;

        forecastHTML += `
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
    }

    document.querySelector("#forecast").innerHTML = forecastHTML;
}

// Search for city
document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let city = document.getElementById("search-input").value;
    getWeather(city);
});

// Get weather data for the city
async function getWeather(city) {
    let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51d0772ba951b254bef717f872899c0b`
    );
    let data = await response.json();
    console.log(data);

    // Get today's weather
    let today = data.weather[0].description;
    let icon = data.weather[0].icon;
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let date = new Date();

    // Display today's weather
    document.getElementById("city").innerHTML = city;
    document.getElementById("date").innerHTML = date.toLocaleDateString();
    document.getElementById("icon").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    document.getElementById("temperature").innerHTML = `Temperature: ${temp} &#8457;`;
    document.getElementById("humidity").innerHTML = `Humidity: ${humidity}`;
    document.getElementById("wind-speed").innerHTML = `Wind Speed: ${wind} mph`;

    // Get 5-day forecast
    response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=51d0772ba951b254bef717f872899c0b`
    );
    data = await response.json();
    console.log(data);

    // Display 5-day forecast
    let forecast = data.list;
    let forecastRow = document.createElement("div");
    forecastRow.setAttribute("class", "forecast-row d-flex justify-content-between");

    let forecastSection = document.getElementById("forecast");

    // Loop through the 5-day forecast
    for (let i = 0; i < 5; i++) {
        let day = new Date(forecast[i].dt * 1000).toLocaleDateString();
        let forecastIcon = forecast[i].weather[0].icon;
        let forecastTemp = forecast[i].main.temp;
        let forecastHumidity = forecast[i].main.humidity;

        let forecastCol = document.createElement("div");
        forecastCol.setAttribute("class", "forecast-col text-center p-2");

        // Create forecast date element
        let forecastDate = document.createElement("p");
        forecastDate.setAttribute("class", "forecast-date mb-2");
        forecastDate.innerHTML = day;
        forecastCol.appendChild(forecastDate);

        // Create forecast icon element
        let forecastIconImg = document.createElement("img");
        forecastIconImg.setAttribute("src", 'http://openweathermap.org/img/wn/${forecastIcon}@2x.png');
        forecastIconImg.setAttribute("class", "forecast-icon mb-2");
        forecastCol.appendChild(forecastIconImg);

        // Create forecast temperature element
        let forecastTempP = document.createElement("p");
        forecastTempP.innerHTML = 'Temp: ${forecastTemp} &#8457';
        forecastCol.appendChild(forecastTempP);

        // Create forecast humidity element
        let forecastHumidityP = document.createElement("p");
        forecastHumidityP.innerHTML = 'Humidity: ${forecastHumidity}%';
        forecastCol.appendChild(forecastHumidityP);

        // Append forecast column to forecast row
        forecastRow.appendChild(forecastCol);
    }

    // Append forecast row to forecast section
    forecastSection.appendChild(forecastRow);

}