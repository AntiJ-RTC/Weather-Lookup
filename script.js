let search;
let input;
let info;
let autoComp;

window.addEventListener('load', function(){
    info = this.document.getElementById('info');
    input = this.document.getElementById('input-box');
    search = this.document.getElementById('search');
    autoComp = this.document.getElementById('autocomplete');
    input.addEventListener('keyup', searchCity);

});

async function searchCity(){
    clearDropdown();

    let cityList = [];
    const apiKey ='72cf5f0ea187d5f8386c5cd9bc9f3e06';

    const cityName = document.querySelector('.search-box input').value;
    if (cityName.length === 0){
        return;
    }
    const cityRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=5&language=en&format=json`)
    const cityData = await cityRes.json();
    for (let i = 0; i < cityData.results.length; i++) {
        cityList.push(cityData.results[i]);        
    }
    console.log(cityList);
    autocompleteDropdown(cityList);


    // console.log(`${cityList[0].name}, ${cityList[0].admin1}, ${cityList[0].country}`);

    // const lat = cityList[0].latitude;
    // const lon = cityList[0].longitude;
    // console.log(`${lat} ${lon}`)
    // const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    // const weatherData = await weatherRes.json();
    // console.log(weatherData);

    // const forecastRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`);
    // const forecastData = await forecastRes.json();
    // console.log(forecastData);
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
            input.value = city.name;
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
