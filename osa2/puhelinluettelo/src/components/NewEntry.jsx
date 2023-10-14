import entryService from '../services/entryService'

const NewEntry = (props) => {
  
    const addEntry = (event) => {
  
      event.preventDefault()
  
      const prevEntries = props.persons.map(previousEntries => previousEntries.name)
  
      if (prevEntries.includes(props.nameEntry) === true) {
        if (window.confirm(`${props.nameEntry} is already in the phonebook, replace old number with a new one?`)) {
          
          const existingEntry = props.persons.find((entry) => entry.name === props.nameEntry)
          const entryId = existingEntry.id

          const entryObject = {
            name: props.nameEntry,
            number: props.numEntry,
          }
          
          entryService
            .modify(entryId, entryObject)
            .then((response) => {
              props.setPersons(props.persons.map((entry) => entry.id === entryId ? response.data : entry))
              props.setFiltered(props.persons.map((entry) => entry.id === entryId ? response.data : entry))
              props.setNameEntry('')
              props.setNumEntry('')

              props.setUpdateMessage(`Number of ${props.nameEntry} was updated in the phonebook`)
              
              setTimeout(() => {
                props.setUpdateMessage(null)
              }, 4000)
            })
            .catch(error => {
              props.setErrorMessage(`${props.nameEntry} was already deleted from the phonebook`)

              setTimeout(() => {
                props.setErrorMessage(null)
              }, 4000)

              props.setPersons(props.persons.filter(n => n.id !== entryId))
              props.setFiltered(props.persons.filter(n => n.id !== entryId))
              props.setNameEntry('')
              props.setNumEntry('')
            })
        }
      }
      else { 
        const entryObject = {
          name: props.nameEntry,
          number: props.numEntry,
        }
        entryService
            .create(entryObject)
            .then(response => {
                props.setPersons(props.persons.concat(response.data))
                props.setFiltered(props.filtered.concat(response.data))
                props.setNameEntry('')
                props.setNumEntry('')
                
                props.setUpdateMessage(`${props.nameEntry} was added to the phonebook`)
                
                setTimeout(() => {
                  props.setUpdateMessage(null)
                }, 4000)
            })
      }
    }
    
    return (
      <form onSubmit={addEntry}>
        <div>
          name: 
          <input 
            value={props.nameEntry}
            onChange={props.handleNameUpdate}
          />
        </div>
        <div>
          number:
          <input 
            value={props.numEntry}
            onChange={props.handleNumUpdate}
          />
        </div> 
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    )
  }

export default NewEntry