// weather.js
const API_KEY = "51d0772ba951b254bef717f872899c0b";

// function to get weather information for a specific city
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51d0772ba951b254bef717f872899c0b`)
        .then(response => response.json())
        .then(data => {
            // console.log the data for weather information for the entered city
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
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
