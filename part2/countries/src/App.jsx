import { useEffect, useState } from "react"
import countryService from "./services/country"
import Country from "./components/Country"
import CountryList from "./components/CountryList"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    countryService
      .getAll()
      .then(data => {
        setCountries(data)
      })
  }, [])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const showCountry = (country) => {
    setFilter(country.name.common)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      {filter == ""
        ? null
        : countriesToShow.length == 1
          ? <Country country={countriesToShow[0]} />
          : <CountryList countries={countriesToShow} showCountry={showCountry} />
      }
    </div>
  )
}

export default App
