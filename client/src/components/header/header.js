import Fetch from '../../../utils/fetch';
import logo from '../../assets/img/logo.png';
import Body from '../body/body';

function html() {
    return `
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="${logo}" width="32" height="32" alt="logo">
                    Weather-App
                </a>
                <form class="d-flex flex-grow-1">
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">
                            <i class="material-symbols-outlined">
                                search
                            </i>
                        </span>
                        <input id="search-input" type="text" class="form-control" placeholder="Buscar cidade" aria-label="Buscar cidade">
                    </div>
                    <button class="btn btn-outline-primary ms-3" type="button">C°</button>
                </form>
                <ol id="list" class="list-group" style="display: none; position: absolute; z-index: 1"></ol>                
            </div>
        </nav>
    </header>
    `
}

function js(url_base) {
  const input = document.getElementById('search-input')
  console.log(input.offsetTop);

  input.addEventListener('input', async (event) => {
      if (event.target.value.length >= 2) {
            const data = await Fetch(`${url_base}/cities?name=${event.target.value}`, 'GET')
        
            __showList(data)
      }
  })
}

function __showList(data) {
    const input = document.getElementById('search-input');
    const header = document.querySelector('header')
    data = data.cities;

    const list = document.getElementById('list');
    list.innerHTML = '';

    data.forEach(city => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.onclick = selectCity.bind(this, city)
        li.textContent = `${city.name}, ${city.country}`

        list.appendChild(li);
    });

    list.style.top = `${header.offsetHeight}px`; 
    list.style.left = `${input.offsetLeft}px`;
    list.style.width = `${input.offsetWidth}px`;
    list.style.display = 'block';
}

async function selectCity(city) {
    const list = document.getElementById('list');
    list.style.display = 'none';

    const unitsValue = JSON.parse(localStorage.getItem('units'));

    let unitsName;

    if (unitsValue === '°C') {
        unitsName = 'metric';
    } else {
        unitsName = 'imperial';
    }

    const data = await Fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}&lang=${'pt-br'}&units=${unitsName}&appid=${import.meta.env.VITE_API_KEY}`, 'GET')
    Body.js(data, unitsValue)

    localStorage.setItem('last_weather_searched', JSON.stringify(data))
}


const Header = {
    html: html,
    js: js,
}

export default Header