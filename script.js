let search;
let info;
let citylist = [];

window.addEventListener('load', function(){
    info = this.document.getElementById('info');
    search = this.document.getElementById('search');
    search.addEventListener('click', searchWeather)
});

function searchWeather(){
    const cityname = document.querySelector('.search-box input').value;
    fetch.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityname}&count=10&language=en&format=json`)
    .then(data => {
        data.forEach(city => {

        })
    })
    .catch(error => console.log(error));

}

