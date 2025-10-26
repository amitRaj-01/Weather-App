import { API_KEY , API_URL } from "./env.js";

let searchInput = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");

let weather = document.querySelector(".weather");
let errorMsg = document.querySelector(".error");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
    try {
        const response = await fetch(`${API_URL}${cityName}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        console.log(data);

        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + "km/h";

        // Map weather conditions to corresponding icons
        const weatherIcons = {
            "Clouds": "cloudy.png",
            "Clear": "clear.png",
            "Rain": "rainy.png",
            "Drizzle": "drizzle.png",
            "Mist": "mist.png",
            "Haze": "mist.png",
            "Snow": "snow.png"
        };

        // Set weather icon based on main weather condition
        const weatherCondition = data.weather[0].main;
        weatherIcon.src = weatherIcons[weatherCondition] || "default.png";

        errorMsg.style.display = "none";
        weather.style.display = "block";
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        errorMsg.style.display = "block";
        weather.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});
