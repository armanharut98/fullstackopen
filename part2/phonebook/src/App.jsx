import { useEffect, useState } from 'react'
import personService from "./services/person"
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      if (confirm(`${newName} is already added to the phonebook. Replace old number with the new one?`)) {
        const updatedPerson = { ...personExists, number: newNumber }
        personService
          .update(updatedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : response.data))
            setMessage({ content: `Updated ${response.data.name}'s number`, type: "success" })
          })
          .catch(error => {
            setMessage({
              content: `Information of ${updatedPerson.name} has already been removed from the server`,
              type: "error"
            })
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage({ content: `Added ${response.data.name}`, type: "success" })
        })
    }
    setNewName("")
    setNewNumber("")
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deletePerson = (id) => {
    personService
      .remove(id)
    setPersons(persons.filter(p => p.id !== id))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      {
        message === null
          ? null
          : <Notification content={message.content} type={message.type} />
      }
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App