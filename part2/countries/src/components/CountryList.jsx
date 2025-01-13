const CountryList = ({ countries, showCountry }) => {
    return (
        <div>
            {countries.length > 10
                ? <p>too many matches, specify another filter</p>
                : countries.map(country =>
                    <p key={country.cca2}>
                        {country.name.common}
                        <button onClick={() => showCountry(country)}>show</button>
                    </p>)
            }
        </div>
    )
}

export default CountryList
