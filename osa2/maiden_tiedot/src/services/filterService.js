import axios from 'axios'

const api_key = import.meta.env.VITE_KEY

const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all/'

const oneUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getList = () => {
    return axios.get(allUrl)
}

const getOne = (name) => {
    return (
        axios.get(oneUrl + `${name}`)
    )
}

const getGeoLocation = (name) => {
    return (
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${api_key}`)
    )
}

const getWeather = (lat, lon) => {
    return (
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    )
}

export default { getList, getOne, getGeoLocation, getWeather }