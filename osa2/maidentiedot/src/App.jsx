import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({name, handleChange, onSearch}) => {

  return (
    <form onSubmit={onSearch}>
        find countries <input value={name.name} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
  )
}

const Result = ({ filteredCountries, showLanguages }) => {
  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many countries, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p><strong>Population:</strong> {filteredCountries[0].population}</p>
          <p><strong>Capital:</strong> {filteredCountries[0].capital}</p>
          <p><strong>Languages:</strong></p>
          <ul>{showLanguages(filteredCountries[0].languages)}</ul>
          <img src={filteredCountries[0].flags.png} />
        </div>
      ) : (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    if (country) {
      console.log('fetching countries...')
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const data = response.data
          const filtered = data.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))
          setFilteredCountries(filtered)
          setCountries(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [country])

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(name)
  }



  const showLanguages = (languages) => {
    return Object.values(languages).map((language, index) => (
      <li key={index}>{language}</li>
    ))
  }

  return (
    <div>
      <Filter name={name} handleChange={handleChange} onSearch={onSearch} />
      <Result filteredCountries={filteredCountries} showLanguages={showLanguages} />
    </div>
  )
}

export default App
