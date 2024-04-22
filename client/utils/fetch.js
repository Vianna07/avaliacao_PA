import { getUnitName } from "./units"

export default async function Fetch(url, method) {
    const data = await fetch(url, {method: method})
    .then(response => {
        if (response.status === 200 || response.status === 304) {
            return response.json()
        } else {
            throw new Error(`${response.status} - ${response.statusText}`)
        }
    })
    .then(data => data)
    .catch(error => {
        throw new Error(`${error.message} - ${error}`)
    })

    return data
}

export async function updateData(data, units) {
    let _data

    if (data) {
        _data = await Fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coord.lat}&lon=${data.coord.lon}&lang=${'pt_br'}&units=${getUnitName(units)}&appid=${import.meta.env.VITE_API_KEY}`, 'GET')
                            .catch(error => {
                                console.error(error);
                                return null
                            })
    } else {
        _data = localStorage.getItem('last_weather_searched')
    }

    if (_data) {
        localStorage.setItem('last_weather_searched', JSON.stringify(_data))
    }

    return _data;
}