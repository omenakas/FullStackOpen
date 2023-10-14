import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = entryObject => {
    return axios.post(baseUrl, entryObject)
}

const deleteObject = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

const modify = (id, entryObject) => {
    return axios.put(`http://localhost:3001/persons/${id}`, entryObject)
}

export default { getAll, create, deleteObject, modify }