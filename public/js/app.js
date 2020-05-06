console.log('client side js loaded');
const weatherForm = document.querySelector('form');
const searchElem = document.querySelector('input');
const weatherData = document.querySelector('#msgOne');
const forecastData = document.querySelector('#msgTwo');
weatherData.textContent = '';
forecastData.textContent = '';
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    weatherData.textContent = 'Loading';
    const searchLocation = searchElem.value;
    fetch('http://localhost:3000/weather?address=' + searchLocation).then((response) => {
        response.json().then(data => {
            if (data.error) {
                weatherData.textContent = data.error;
            } else {
                weatherData.textContent = data.location;
                forecastData.textContent = data.forecast;
            }
        })
    })
})