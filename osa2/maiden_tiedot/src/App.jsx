import { useState, useEffect } from 'react'
import filterService from './services/filterService'


const Single = ({ input }) => {
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [languages, setLanguages] = useState([])
  const [flag, setFlag] = useState([])
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [temperature, setTemperature] = useState()
  const [wind, setWind] = useState()
  const [icon, setIcon] = useState()

  useEffect(() => {
    filterService
        .getOne(input)
        .then((response) => {
          setCapital(response.data.capital[0])
          setArea(response.data.area)
          setLanguages(Object.values(response.data.languages))
          setFlag(Object.values(response.data.flags))
        })
        
      }, [input])
      
    useEffect(() => {
        filterService
          .getGeoLocation(capital)
          .then(response => {
            setLatitude(response.data[0].lat)
            setLongitude(response.data[0].lon) 
          })
      }, [capital])

    useEffect(() => {
      filterService
        .getWeather(latitude, longitude)
        .then(response => {
          setTemperature((response.data.main.temp - 273).toFixed(0))
          setWind(response.data.wind.speed)
          setIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
        })
    }, [longitude])

  return (
    <div>
      <h1>{input}</h1>
      <p>capital: {capital}</p>
      <p>area: {area} square kilometers</p>
      <h3>languages</h3>
      <ul>
        {languages.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <img src={flag[0]} />
      <h3>Weather in {capital}</h3>
      <p>temperature {temperature} Celsius</p>
      <img src={icon} />
      <p>wind {wind} m/s</p>
    </div>
  )
}

const Filter = ({ handleFilter, filter }) => {
  return (
    <form>
      <label>find countries </label>
      <input 
        value={filter}
        onChange={handleFilter}
      />
    </form>
  )
}

const List = ({ filter, filteredData, setFilteredData }) => {
  
  const handleShowClick = (item) => {
    setFilteredData([item])
  }
  
  if (filter === '') {
    return (
      <p>
        Type something to find out things about countries.
      </p>
    )
  }
  else if (filteredData.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  else if (filteredData.length <= 10 && filteredData.length > 1) {
    return (
      filteredData.map((item) => (
        <div key={item}>
          {item}
          <button onClick={() => handleShowClick(item)}>show</button>
        </div>
      ))
    )
  }
  else if (filteredData.length === 1) {
    return (
      <Single input={filteredData[0]}/>
    )
  }
  else if (filteredData.length < 1) {
    return (
      <p>
        Nothing found with given filter
      </p>
    )
  }
}

function App() {
  const [filter, setFilter] = useState('')
  const [list, setList] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    filterService
      .getList()
      .then(response => {
        const data = response.data.map((country) => country.name.common)
        setList(data)
      })
  }, [])

  const handleFilter = (event) => {
    
    event.preventDefault()

    setFilter(event.target.value)
    doFiltering(event.target.value)

  }

  const doFiltering = (input) => {
    if (input === '') {
      setFilteredData(list)
    }
    else {
      setFilteredData(list.filter((country) => country.includes(input)))
    }
  }

  return (
    <>
      <div>
        <Filter 
          handleFilter={handleFilter}
          filter={filter}
        />
      </div>
      <div>
        <List 
          filter={filter}
          filteredData={filteredData}
          
          setFilteredData={setFilteredData}
        />
      </div>
    </>
  )
}

export default App
