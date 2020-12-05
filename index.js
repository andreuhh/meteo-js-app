const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const card = document.querySelector('.card');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

//const fetch = require('node-fetch');
//require('dotenv').config();

const key = 'a47610b0cdb62293b8a00aceb5e2de3c';
//const key = process.env.API_KEY;

const citySearch = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;
}

const findHour = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}

const convertInCelcius = (kelvin) => {
  celcius = Math.round(kelvin - 273.15);
  return celcius;
}

changeUiView = (city) => {
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${convertInCelcius(city.main.temp)}&deg;</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${convertInCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${convertInCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${convertInCelcius(city.main.feels_like)}&deg;C</p>
              <span>T percepita</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Umidità</span>
            </div>
          </div>
    `;
    if (findHour(imageName)) {
        console.log('day');
        timeImage.setAttribute('src', 'img/day_small.png');
        card.classList.remove('bg-black');
        if (cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
            
        } else {
            cityName.classList.add('text-black');
            
        }

    } else {
        console.log('night');
        timeImage.setAttribute('src', 'img/night_small.png');
        card.classList.add('bg-black');
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }
    }
    cardInfo.classList.remove('d-none');
}

//add an event listner to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();

    citySearch(citySearched)
        .then((data) => {
            changeUiView(data);
        })
        .catch((error) => { console.log(error) })
})