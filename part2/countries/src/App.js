import { useState, useEffect } from 'react'
import axios from 'axios'
import "./App.css"

const Countries = ({ countryList, setCountryList }) => {
  if (countryList.length === 1) return null;

  return (
    <div>
      {countryList.map((country) => (
        <div key={country.name.official}>
          {country.name.common}{" "}
          <button onClick={() => setCountryList([country])}>show</button>
        </div>
      ))}
    </div>
  );
};

const CountryInfo = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>language</h2>
      <ul>{Object.values(country.languages).map((language)=>(
        <li key={language}>{language}</li>
      ))}
      </ul>
      <img src={country.flags.png} alt={"Flag"} />
    </div>
    
  )
}



const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleSChange = (event) => {
    const lookFor = event.target.value;
    setSearch(lookFor);
  
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(lookFor.toLowerCase())
    );
  
    setCountryList(filteredCountries);
  };

  return(
    <div>
      <div>
        find countries <input value = {search} onChange= {handleSChange}/>
      </div>
        {countryList.length === 1 ? (
            <CountryInfo country = {countryList[0]} />
        ): null}
        {countryList.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ): (
          <Countries countryList={countryList} setCountryList={setCountryList}/>
        )}
    </div>
  )
}

export default App