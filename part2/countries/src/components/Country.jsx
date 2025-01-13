import { useEffect, useState } from "react"
import weatherService from '../services/weather'

const WeatherInfo = ({ weather, capital }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={iconUrl}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
            .getWeatherData(country)
            .then(data => setWeather(data))
    }, [])

    const capital = country.capital[0]
    const languages = Object.values(country.languages)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {capital}</p>
            <p>area: {country.area}</p>
            <p><strong>languages:</strong></p>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            {weather == null
                ? null
                : <WeatherInfo weather={weather} capital={capital} />
            }
        </div>
    )
}

export default Country
