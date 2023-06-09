import { useState } from 'react'

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

const Persons = ({persons}) => {
  return(
    <ul>
      {persons.map((person, index) => (
          <li key={index}> {person.name} {person.number}</li>
      ))}</ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findPerson, setFindPerson] = useState('')
  const handleNChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePNumChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    setFindPerson(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (persons.find((person) => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const addThis = {name: newName, number: newNumber}
    setPersons([...persons, addThis])
    setNewName('')
    setNewNumber('')

    
  }

  const filter = persons.filter((person) =>
    person.name.toLowerCase().includes(findPerson.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      
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

      <Persons persons={filter}/>
    </div>
  )
}

export default App