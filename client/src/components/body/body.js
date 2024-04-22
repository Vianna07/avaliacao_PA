import './body.css'
import sunset from '../../assets/img/sunset.jpeg'
import sunrise from '../../assets/img/sunrise.jpeg'
import humidity from '../../assets/img/humidity.jpeg'
import cloud_all from '../../assets/img/cloud-all.png'

function html() {
    return `
    <div id="data" class="container mt-4 d-flex flex-column gap-3"></div>`
}

async function js(data, units) {
    const div = document.getElementById('data')
    div.innerHTML = `
    ${!!data ? `
    <div class="row justify-content-center">
        <div id="main-card" class="col-10 col-sm-10">
            <div class="card w-100">
                <div class="card-body">
                    <div class="text-center">
                        <h2 class="card-text">${data.name}, ${data.sys.country}</h2>
                        <p class="card-text">${new Date(data.dt * 1000).toLocaleString('pt-br')}</p>
                    </div>
                    <div class="d-flex align-items-center gap-3 justify-content-center">
                        <img id="main-img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="img"></img>
                        <h1 class="card-title display-1">${String(Math.round(data.main.temp))}${units}</h1>
                        <div class="d-flex flex-column">
                            <p class="card-text text-capitalize" style="margin: 0;">${data.weather[0].description}</p>
                            <p class="card-text">Sensação Térmica ${String(Math.round(data.main.feels_like))}${units}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center gap-2">
        <div class="col-10 col-sm-5">
            <div class="card w-100">
                <div class="card-body text-center" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Nascer do Sol">
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <img src="${sunrise}" width="48" height="48" alt="img"></img>
                        <h4 class="card-text">${new Date(data.sys.sunrise * 1000).toLocaleString('pt-br').split(',')[1]}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-10 col-sm-5">
            <div class="card w-100">
                <div class="card-body text-center" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Pôr do Sol">
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <img src="${sunset}" width="48" height="48" alt="img"></img>
                        <h4 class="card-text">${new Date(data.sys.sunset * 1000).toLocaleString('pt-br').split(',')[1]}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center gap-2">
        <div class="col-5 col-sm-5">
            <div class="card w-100">
                <div class="card-body text-center" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Nascer do Sol">
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <img src="${humidity}" width="48" height="48" alt="img"></img>
                        <h4 class="card-text">${data.main.humidity}%</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5 col-sm-5">
            <div class="card w-100">
                <div class="card-body text-center" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Nascer do Sol">
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <img src="${cloud_all}" width="48" height="48" alt="img"></img>
                        <h4 class="card-text">${data.clouds.all}%</h4>
                    </div>
                </div>
            </div>
        </div>    
    </div>` :
    `<h2 class="text-center">Nenhuma Cidade Escolhida</h2>`}
    `
}

const Body = {
    html: html,
    js: js,
}

export default Body