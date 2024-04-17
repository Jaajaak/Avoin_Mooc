import { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/contacts'


const Filter = ({searchName, handleSearchChange}) => {

  return (
    <form>
        <div>
          Filter shown with: <input value={searchName}
          onChange={handleSearchChange}
           />
        </div> 
      </form>
  )
}

const PersonForm   = ({addContact, newName, handleContactChange, newNumber, handleNumberChange}) => {

  return (
    <form onSubmit={addContact}>
        <div>
          name: <input value={newName}
          onChange={handleContactChange}
           />
        </div> 
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}
           />
        </div> 
          <button type="submit">add</button>
    </form>
  )
}

const Person = ({persons, searchName, deleteContact}) => {
  const contactsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <ul>
      {contactsToShow.map(person => 
        <li key={person.id}>{person.name} - {person.number}
        <button onClick={() => deleteContact(person.id)}>delete</button>
        </li>
      )}
    </ul>
  )
}

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const generateId = () => { //To avoid duplicates after deleting a contact
    const timestamp = new Date().getTime() // Current time
    const randomComponent = Math.floor(Math.random() * 1000) // Generate a random number using math.random
    return `${timestamp}-${randomComponent}` // Time minus random to generate a new random id
  }

  const addContact = (event) => {
    event.preventDefault()
  
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`)
      return
    }

    const recentId = persons.reduce((max, person) => Math.max(max, person.id), 0)
    const newId = recentId + 1

    const contactObject = {
      name: newName,
      id: generateId(),
      number: newNumber
    }
  
    contactService
      .create(contactObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          ` '${newName}' was added to the phonebook`
        )
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
      .catch(error => {
        console.error("Error adding contact:", error)
        setErrorMessage(`Error adding contact: ${error.message}`)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
}

const deleteContact = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this contact?")

  const index = persons.findIndex(person => person.id === id)
  
  if (!confirmDelete) {
    return
  }

  
    contactService
      .erase(id)
    .then(() => {
      const updatedPersons = persons.filter(person => person.id !== id)
      setPersons(updatedPersons)
      setErrorMessage(`Deletion of contact from the phonebook was successful`)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    })
    .catch(error => {
      console.error("Error deleting contact:", error)
      setErrorMessage(`Error deleting contact: ${error.message}`)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    })
}

  const handleContactChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm  addContact={addContact}
      newName={newName} handleContactChange={handleContactChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Person persons={persons} searchName={searchName} deleteContact={deleteContact}/>
    </div>
  )

}

export default App