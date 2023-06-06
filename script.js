let search;
let info;

window.addEventListener('load', function(){
    info = this.document.getElementById('info');
    search = this.document.getElementById('search');
    search.addEventListener('click', searchWeather);
});

async function searchWeather(){
    let cityList = [];
    const apiKey ='72cf5f0ea187d5f8386c5cd9bc9f3e06';

    const cityName = document.querySelector('.search-box input').value;
    const cityRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`)
    const cityData = await cityRes.json();
    for (let i = 0; i < cityData.results.length; i++) {
        cityList.push(cityData.results[i]);        
    }
    console.log(cityList);
    console.log(`${cityList[0].name}, ${cityList[0].admin1} (${cityList[0].country_code})`);

    const lat = cityList[0].latitude;
    const lon = cityList[0].longitude;
    console.log(`${lat} ${lon}`)
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    const weatherData = await weatherRes.json();
    console.log(weatherData);

    const forecastRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`);
    const forecastData = await forecastRes.json();
    console.log(forecastData);
}


