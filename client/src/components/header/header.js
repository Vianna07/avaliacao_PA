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
                    <button id="btn-units" class="btn btn-outline-primary ms-3" type="button">${JSON.parse(localStorage.getItem('units'))}</button>
                </form>
                <ol id="list" class="list-group" style="display: none; position: absolute; z-index: 1"></ol>                
            </div>
        </nav>
    </header>
    `
}

function js(url_base) {
  const input = document.getElementById('search-input')
  const list = document.getElementById('list');
  const btnUnits = document.getElementById('btn-units')

  window.addEventListener('resize', (event) => {
    if (list.style.display != "none") {
        const positions = input.getBoundingClientRect()
    
        list.style.left = `${positions.left}px`;
        list.style.top = `${positions.bottom}px`; 
        list.style.width = `${positions.width}px`;
        list.style.display = 'block';
    }
  })

  input.addEventListener('input', async (event) => {
      if (event.target.value.length >= 2) {
            const data = await Fetch(`${url_base}/cities?name=${event.target.value}`, 'GET')
        
            __showList(data)
      } else {
            const list = document.getElementById('list');
            list.style.display = 'none';
      }
  })

  btnUnits.addEventListener('click', (event) => {
    const units = {
        "°C": "°F",
        "°F": "°C"
    }

    const currentUnit = JSON.parse(localStorage.getItem("units"))
    console.log(currentUnit);
    event.target.textContent = units[currentUnit]
    localStorage.setItem('units', JSON.stringify(units[currentUnit]))
  })
}

function __showList(data) {
    const input = document.getElementById('search-input');
    
    data = data.cities;

    const list = document.getElementById('list');
    list.innerHTML = '';

    data.forEach(city => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h6 = document.createElement('h6');

        img.src = `https://flagsapi.com/${city.country}/flat/32.png`
        h6.className = "m-0"
        h6.textContent = `${city.name}, ${city.country}`

        li.className = 'list-group-item d-flex align-items-center gap-2';
        li.onclick = selectCity.bind(this, city)
        li.appendChild(img)
        li.appendChild(h6)

        list.appendChild(li);
    });

    const positions = input.getBoundingClientRect()

    list.style.left = `${positions.left}px`;
    list.style.top = `${positions.bottom}px`; 
    list.style.width = `${positions.width}px`;
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