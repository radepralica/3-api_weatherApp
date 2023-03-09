'use strict';
const jumbotron = document.getElementById('jumbotron');
const btnPikaziVrijeme = document.getElementById('prikaziVrijeme');
const grad = document.querySelector('.grad')
let divLok = document.getElementById('location');
const sekcija = document.getElementById('sekcija');
const imgWeather = document.getElementById('weatherIcon');
const ljubav = document.getElementById('ljubav');
const racunLjubavi = document.getElementById('racunLjubavi');

function renderWeather(data) {
  const curr = data.current;

  const divEl = document.createElement('div');

  divEl.innerHTML = `
  
  <div id="location" class="container bg-info rounded">
      <br>
      <p>${data.request.query}</p>

  </div>

  <div class="row">

  <div id="divOpis" class="col-6">

      <table class="table" style="font-size: larger;text-align: center;">
     
          <thead>

          </thead>
          <tbody id="tBody">
              <tr>
                  <td>Temperature</td>
                  <td>${curr.temperature} °C</td>

              </tr>
              <tr>
                  <td>Humidity</td>
                  <td>${curr.humidity} %</td>

              </tr>
              <tr>
                  <td>Description</td>
                  <td>${curr.weather_descriptions[0]}</td>

              </tr>
          </tbody>
          </table>
           </div>

           <div id="divIcon" class="col-6">

           <img id="weatherIcon" src="" alt="">
           </div>
           </div>


`;
  
  sekcija.appendChild(divEl);
}



const key = '805a2f167af51eb21d1eda909532aa9f';
const weather = function (city) {
  fetch(`http://api.weatherstack.com/current?access_key=${key}&query=${city}`)
    .then(res => res.json())
    .then(data => {
      renderWeather(data);
      
     
      if (data.current.weather_descriptions[0] === 'Clear') {
        weatherIcon.src += '/assets/clear.jpg';
      } else if (data.current.weather_descriptions[0] === 'Partly cloudy') {
        weatherIcon.src += '/assets/partly-cloudy.jpg';
      } else if (data.current.weather_descriptions[0] === 'Sunny') {
        weatherIcon.src += '/assets/sunny.png';
      } else if (data.current.weather_descriptions[0] === 'Shallow Fog') {
        weatherIcon.src += '/assets/deep-fog.png';
      } else if (data.current.weather_descriptions[0] === 'Overcast') {
        weatherIcon.src += '/assets/overcast.png';
      } else if (data.current.weather_descriptions[0] === 'Light Drizzle') {
        weatherIcon.src += '/assets/light-rain.png';
      } else if (data.current.weather_descriptions[0] === 'Light Rain Shower') {
        weatherIcon.src += '/assets/lighter-rain.png';
      } else if (data.current.weather_descriptions[0] === 'Light Snow') {
        weatherIcon.src += '/assets/light-snow.png';
      } else {
        weatherIcon.src = other;
      }
    });
};

btnPikaziVrijeme.addEventListener('click', function () {
  sekcija.innerHTML = '';
  weather(grad.value);
  grad.value = '';
});
weather('Banja Luka');

grad.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.key === 'Enter') {
    sekcija.innerHTML = '';
    weather(grad.value);
    grad.value = '';
  }
});

