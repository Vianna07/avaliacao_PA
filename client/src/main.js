import Header from './components/header/header'
import './style.css'

import "bootstrap/dist/css/bootstrap.min.css"
import * as bootstrap from 'bootstrap'
import Body from './components/body/body'

const URL_BASE = import.meta.env.VITE_API_URL_BASE

const data = JSON.parse(localStorage.getItem('openweathermap'))
const units = JSON.parse(localStorage.getItem('units')) || '°C'

localStorage.setItem('units', JSON.stringify(units))


console.log(data);

document.querySelector('#app').innerHTML = `
  ${Header.html()}
  ${Body.html()}
`

Header.js(URL_BASE)
Body.js(data, units)





// localStorage.setItem('openweathermap', JSON.stringify(data))
