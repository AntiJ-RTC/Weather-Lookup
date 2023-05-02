let search;
let info;

window.addEventListener('load', function(){
    info = this.document.getElementById('info');
    search = this.document.getElementById('search');
    search.addEventListener('click', searchWeather)
});

function searchWeather(){
    const APIkey = '72cf5f0ea187d5f8386c5cd9bc9f3e06'
    const cityname = document.querySelector('.search-box input').value;
    let fetchWeather = new FetchAPI();
    fetchWeather.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial&appid=${APIkey}`)
    .then(data => info.innerHTML = JSON.stringify(data))
    .catch(error => console.log(error));
}

class FetchAPI{
    get(url){
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }
}