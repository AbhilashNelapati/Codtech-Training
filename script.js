const search = document.querySelector('.search-box button');
const weatherInfoBox = document.querySelector('.weather-info-box');
const notFoundBox = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const city = document.getElementById('search-btn').value;
    const APIKey = 'd6bed417c7a0ff4ac0c0da0b094654b6'; // Replace with your actual API key

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                weatherInfoBox.style.display = 'none';
                notFoundBox.style.display = 'block';
                return;
            }

            // Display weather info
            weatherInfoBox.style.display = 'block';
            notFoundBox.style.display = 'none';

            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;
        });
});
