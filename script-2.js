let search;
let input;
let currentTemp;
let info;
let autoComp;

window.addEventListener('load', function(){
    info = this.document.getElementById('info');
    input = this.document.getElementById('input-box');
    search = this.document.getElementById('search');
    autoComp = this.document.getElementById('autocomplete');
    input.addEventListener('keyup', searchCity);
    loadWeather();
});


async function searchCity(){
    clearDropdown();

    let cityList = [];
    const cityName = document.querySelector('.search-box input').value;
    if (cityName.length === 0){
        return;
    }
    const cityRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`)
    const cityData = await cityRes.json();
    for (let i = 0; i < cityData.results.length; i++) {
        cityList.push(cityData.results[i]);        
    }
    autocompleteDropdown(cityList);
}

async function getWeather(city){
    const apiKey ='72cf5f0ea187d5f8386c5cd9bc9f3e06';

    console.log(city);
    localStorage.setItem('city2', JSON.stringify(city));
    const lat = city.latitude;
    const lon = city.longitude;
    console.log(`${lat} ${lon}`)
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    const weatherData = await weatherRes.json();
    localStorage.setItem('weather2', JSON.stringify(weatherData));
    console.log(weatherData);

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    const forecastData = await forecastRes.json();
    localStorage.setItem('forecast2', JSON.stringify(forecastData));
    console.log(forecastData);
}

function loadWeather(){
    window.addEventListener('keyup', function(evt){
        if(evt.key == "Enter"){
            this.window.location.href = "dual-forecast.html"
        }
    });
    const city = JSON.parse(localStorage.getItem('city2'));
    const weatherData = JSON.parse(localStorage.getItem('weather2'));
    const forecastData = JSON.parse(localStorage.getItem('forecast2'));

    console.log(weatherData);
    console.log(forecastData);

    let miniWeather2 = document.querySelector('.mini-weather-2');

    let cityName = miniWeather2.querySelector('.city-title h1');
    cityName.innerHTML = `${city.name}, ${city.admin1}, ${city.country}`;

    const unixTime = weatherData.dt * 1000;
    const unixToDate = new Date(unixTime).toLocaleString('en-US');
    miniWeather2.querySelector('.city-title h3').innerHTML = `Last Updated: ${unixToDate}`

    let weatherIcon = document.createElement('img')
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    let src = miniWeather2.querySelector('.weather-icon');
    src.appendChild(weatherIcon);

    miniWeather2.querySelector('.current-temp').innerHTML = `${parseInt(weatherData.main.temp)}&deg;F`;
    miniWeather2.querySelector('.low-temp').innerHTML = `Low: ${parseInt(weatherData.main.temp_min)}&deg;F`;
    miniWeather2.querySelector('.high-temp').innerHTML = `High: ${parseInt(weatherData.main.temp_max)}&deg;F`;
    miniWeather2.querySelector('.weather-type').innerHTML = `${weatherData.weather[0].main}`;
    miniWeather2.querySelector('.humidity').innerHTML = `Humidity: ${weatherData.main.humidity}%`;
    miniWeather2.querySelector('.wind').innerHTML = `Wind: ${weatherData.wind.speed} mph`;
    
}

function autocompleteDropdown(list){
    clearDropdown();
    
    const listEl = document.createElement('ul');
    listEl.className = "search-list";
    listEl.id = "search-list";
    list.forEach((city) => {
        const cityItem = document.createElement("li");

        const cityButton = document.createElement("button"); 
        cityButton.innerHTML = `${city.name}, ${city.admin1}, ${city.country}`;
        cityButton.addEventListener("click", function(evt){
            evt.preventDefault();
            input.value = `${city.name}, ${city.admin1}, ${city.country}`;
            getWeather(city);
            clearDropdown();
        });
        cityItem.appendChild(cityButton);

        listEl.appendChild(cityItem);
    });

    autoComp.appendChild(listEl);
}

function clearDropdown(){
    const listEl = document.querySelector("#search-list");
    if(listEl){
        listEl.remove();
    }
}
