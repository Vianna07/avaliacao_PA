import Header from './components/header/header'
import './style.css'

import "bootstrap/dist/css/bootstrap.min.css"
import * as bootstrap from 'bootstrap'
import Body from './components/body/body'
import { updateData } from '../utils/fetch'

const URL_BASE = import.meta.env.VITE_API_URL_BASE

const data = JSON.parse(localStorage.getItem('last_weather_searched'))
const units = JSON.parse(localStorage.getItem('units')) || '°C'

const _data = await updateData(data, units)

localStorage.setItem('units', JSON.stringify(units))

document.querySelector('#app').innerHTML = `
  ${Header.html()}
  ${Body.html()}
`

Header.js(URL_BASE)
Body.js(_data, units)
