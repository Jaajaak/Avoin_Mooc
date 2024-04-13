import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  console.log('effect run, country is now', country);
  useEffect(() => {
  if (country) {
    console.log('fetching countries...');
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/finland`) // Corrected URL
      .then(response => {
        setCountries(response.data); // Adjusted based on expected response structure
      })
      .catch(error => {
        console.log(error);
      });
  }
}, [country]);

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(name)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={name} onChange={handleChange} />
        <button type="submit"></button>
      </form>
      <pre>
        {JSON.stringify(countries, null, 2)}
      </pre>
    </div>
  )
}

export default App
