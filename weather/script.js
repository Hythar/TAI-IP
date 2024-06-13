const apiKey = "75bb7fde9ed4962398ee601276f1a705";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const locationBtn = document.getElementById("location-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch(data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "img/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "img/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "img/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "img/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "img/mist.png";
                break;
            default:
                weatherIcon.src = "img/default.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

async function getWeatherByLocation(position) {
    const { latitude, longitude } = position.coords;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
    
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch(data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "img/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "img/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "img/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "img/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "img/mist.png";
                break;
            default:
                weatherIcon.src = "img/default.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchBox.value);
});

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByLocation, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
