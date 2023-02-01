// weather.js
const API_KEY = "51d0772ba951b254bef717f872899c0b";

// function to get weather information for a specific city
function getWeather(city) {
    const apiKey = '51d0772ba951b254bef717f872899c0b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Get the current date and format it using Moment.js
    const currentDate = moment().format('MMM Do YYYY');

    // Get the temperature, humidity, and wind speed from the data
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Update the content of the <section id="today"> element
    const today = document.querySelector('#today');
    today.innerHTML = `
    <h2 class="text-center">Current Weather for ${data.name}</h2>
    <p class="text-center">${currentDate}</p>
    <p class="text-center">Temperature: ${temperature}°F</p>
    <p class="text-center">Humidity: ${humidity}%</p>
    <p class="text-center">Wind Speed: ${windSpeed} mph</p>
  `;
}

// Get the form and add a submit event listener
const form = document.querySelector("#search-form");
form.addEventListener("submit", e => {
    e.preventDefault();

    // Get the value of the city entered in the form
    const city = document.querySelector("#search-input").value;

    // Call the getWeather function with the city as a parameter
    getWeather(city);
});


// function to get forecast information for a specific city
async function getForecast(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
}
