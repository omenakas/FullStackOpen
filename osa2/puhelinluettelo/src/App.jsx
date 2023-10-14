import { useState, useEffect } from 'react'
import NewEntry from './components/NewEntry'
import entryService from './services/entryService'

const Entry = ({ id, name, number, handleDelete }) => {
  return (
    <p>
      {name} {number} 
      <button id={id}
        onClick={() => handleDelete({ id, name })}>
        delete
      </button>
    </p>
  )
}

const FilterInput = (props) => {
  return (
    <input 
      value={props.filterInput}
      onChange={props.handleFilter}
    />
  )
}

const Notification = ({ message }) => {

  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const Error = ({ message }) => {

  const messageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState ([])
  const [nameEntry, setNameEntry] = useState('')
  const [numEntry, setNumEntry] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [filtered, setFiltered] = useState(persons)
  const [updateMessage, setUpdateMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    entryService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

  const handleNameUpdate = (event) => {  
    setNameEntry(event.target.value)
  }

  const handleNumUpdate = (event) => {
    setNumEntry(event.target.value)
  }  

  const handleFilter = (event) => {
    setFilterInput(event.target.value)
    filter(event.target.value.toLowerCase())
  } 

  const filter = (input) => {
    setFiltered(persons.filter((person) => person.name.toLowerCase().includes(input)))
  }

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      entryService
        .deleteObject(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setFiltered(filtered.filter((person) => person.id !== id))

          setUpdateMessage(`${name} was deleted from the phonebook`)
                
          setTimeout(() => {
            setUpdateMessage(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={updateMessage}/>
        <Error message={errorMessage} />
        <div>
          filter shown with
          <FilterInput 
            filterInput={filterInput} 
            handleFilter={handleFilter} 
          />
        </div>
      <h3>add a new</h3> 
        <div>
          <NewEntry 
            persons={persons}
            filtered={filtered}
            updateMessage={updateMessage}
            errorMessage={errorMessage}

            setFiltered={setFiltered}
            setPersons={setPersons}
            setNameEntry={setNameEntry}
            setNumEntry={setNumEntry}
            setUpdateMessage={setUpdateMessage}
            setErrorMessage={setErrorMessage}

            nameEntry={nameEntry}
            numEntry={numEntry}

            handleNameUpdate={handleNameUpdate}
            handleNumUpdate={handleNumUpdate}
          />
        </div>      
      <h2>Numbers</h2>
      <div>
        {filtered.map(entry => 
          <Entry 
            key={entry.id}
            id={entry.id} 
            name={entry.name} 
            number={entry.number} 
            handleDelete={handleDelete}
          />
        )}    
      </div>
    </div>
  )
}

export default App
