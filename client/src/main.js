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

function getBackgroundColor() {
  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  const morningStart = 6;
  const afternoonStart = 12;
  const eveningStart = 18;

  const morning = "linear-gradient(0deg, rgba(134,230,241,1) 0%, rgba(247,176,23,1) 100%)" 
  const afternoon = "linear-gradient(0deg, rgba(158,236,231,1) 0%, rgba(52,234,238,1) 40%, rgba(0,212,255,1) 100%)"
  const night = "linear-gradient(0deg, rgba(0,212,255,1) 0%, rgba(44,44,219,1) 40%, rgba(2,0,36,1) 100%)"

  if (currentHour >= morningStart && currentHour < afternoonStart) {
    document.body.style.background = morning;
  } else if (currentHour >= afternoonStart && currentHour < eveningStart) {
    document.body.style.background = afternoon;
  } else {
    document.body.style.background = night;
  }

}

getBackgroundColor()

setInterval(getBackgroundColor, 300000);

document.querySelector('#app').innerHTML = `
  ${Header.html()}
  ${Body.html()}
`

Header.js(URL_BASE)
Body.js(_data, units)
