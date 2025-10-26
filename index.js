// const apiKey="a55e3228bf40c319d6c1a109f1205579";
// // const apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=&units=metric&q=";
// const apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=";

// let searchInput=document.querySelector(".search input");
// let searchBtn=document.querySelector(".search button");

// let weather=document.querySelector(".weather");
// let errorMsg=document.querySelector(".error");
// let city=document.querySelector(".city");
// let temp=document.querySelector(".temp");
// let humidity=document.querySelector(".humidity");
// let wind=document.querySelector(".wind");
// let weatherIcon=document.querySelector(".weather-icon");

// async function checkWeather(cityName){
//     const response =await fetch(apiUrl + cityName + "&units=metric" + "&appid=" + apiKey);
//     // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
    
//     if(response.status == 404){
//         errorMsg.style.display="block";
//         weather.style.display="none";
//     }
//     else{
//         let data =await response.json();
//         console.log(data);
//         city.innerHTML=data.name;
//         temp.innerHTML=Math.round(data.main.temp) + "°C";
//         humidity.innerHTML=data.main.humidity + "%";
//         wind.innerHTML=data.wind.speed + "km/h";

//         if(data.weather[0].main == "Clouds"){
//             weatherIcon.src="cloudy.png";
//         }
//         else if(data.weather[0].main == "Clear"){
//             weatherIcon.src="clear.png";
//         }
//         else if(data.weather[0].main == "Rain"){
//             weatherIcon.src="rainy.png";
//         }
//         else if(data.weather[0].main == "Drizzle"){
//             weatherIcon.src="drizzle.png";
//         }
//         else if(data.weather[0].main == "Mist"){
//             weatherIcon.src="mist.png";
//         }
//         else if(data.weather[0].main == "Haze"){
//             weatherIcon.src="mist.png";
//         }
//         else if(data.weather[0].main == "Snow"){
//             weatherIcon.src="snow.png";
//         }
//         errorMsg.style.display="none";
//         weather.style.display="block";
//     }
// }

// searchBtn.addEventListener("click" ,()=>{
//     checkWeather(searchInput.value);
// })



const apiKey = "a55e3228bf40c319d6c1a109f1205579";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

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
        const response = await fetch(`${apiUrl}${cityName}&units=metric&appid=${apiKey}`);
        
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
