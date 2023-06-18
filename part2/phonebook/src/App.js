import { useState, useEffect } from 'react'
import service from "./services/persons"
import'./App.css'

const Message = ({message}) => {
  if (message === null){
    return null
  }

  return(
    <div className = {message ? 'message_status' : ''} >
      {message}
    </div>
  )
}

const Filter = ({findPerson, handleFindChange}) => {
  return(
    <div>
      filter shown with <input value= {findPerson} onChange={handleFindChange}/>
    </div>
  )
}

const PersonForm = ({newName, newNumber, handleNChange, handlePNumChange, handleSubmit}) => {
  return(
    <form onSubmit = {handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNChange}/>
        </div>
        <div>
          number: <input value= {newNumber} onChange={handlePNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({persons, handleDelete}) => {
  return(
    <ul>
      {persons.map((person) => (
          <li key={person.id}> 
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>erase</button>
          </li>
          
      ))}</ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findPerson, setFindPerson] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    service
      .getAll()
      .then(initialstate => {
        setPersons(initialstate)
      })
  }, [])

  const handleNChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePNumChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    setFindPerson(event.target.value)
  }

  const handleDelete = id => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      service
       .remove(id)
       .then(() => {
        setPersons(persons.filter((person)=> person.id !== id))
       })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const checkPerson = persons.find(person=> person.name  === newName)
    if (checkPerson){
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updatePerson = { ...checkPerson, number: newNumber } 
        service
          .update(checkPerson.id, updatePerson)
          .then(updateInfo => {
            setPersons(prevPersons =>
                prevPersons.map(person=> (person.id === checkPerson.id ? updateInfo : person))
            )
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${updateInfo.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setMessage(error.response.data.error);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
    }

  }else{
      const personObject = {
      name: newName,
      number: newNumber,
    }
  
    service
      .create(personObject)
      .then((save) => {
        
        setPersons([...persons, save])
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const filter = persons.filter((person) =>
    person.name.toLowerCase().includes(findPerson.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message = {message} />
      <Filter findPerson={findPerson} handleFindChange={handleFindChange}/>

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNChange={handleNChange}
        handlePNumChange={handlePNumChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      <Persons persons={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App