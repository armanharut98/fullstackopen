import axios from 'axios'
const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const apiUrl = (lat, lon) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
}

const getWeatherData = (country) => {
    const request = axios.get(apiUrl(country.latlng[0], country.latlng[1]))
    return request.then(response => response.data)
}

export default {
    getWeatherData
}
