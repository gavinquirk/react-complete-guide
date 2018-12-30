import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {

  state = {
    persons: [
      { id: 'aw46bw4', name: 'Max', age: 28 },
      { id: 'vbaawfa', name: 'Manu', age: 29 },
      { id: 't4n7uma', name: "Stephanie", age: 26 }
    ],
    otherState: 'Some other value'
  }

  deletePersonHandler = (personIndex) => {
    // MUST UPDATE STATE IMMUTABLY
    // const persons = this.state.persons.slice() // slice creates a copy of the array. Otherwise, state is being directly manipulated
    const persons = [...this.state.persons] // Modern practice for copying array using ES6
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons: persons })
  }

  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>
      )
    }

    return (
      <div className={classes.App}>
        <Cockpit 
          showPersons={this.state.showPersons} 
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
  }

}

export default App
