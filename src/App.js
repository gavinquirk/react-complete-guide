import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium'
import Person from './Person/Person'

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

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      )

      style.backgroundColor = 'red'
      style[':hover'] = { // requires Radium to use pseudoselectors
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = []

    if (this.state.persons.length <= 2) {
      classes.push('red') // classes = ['red']
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold') // classes = ['red', 'bold']
    }

    return (
      <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons
        </button>
        {persons}
      </div>
      </ StyleRoot>
    );
  }

}

export default Radium(App);
