import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass'

export const AuthContext = React.createContext(false)


class App extends PureComponent {
  constructor(props) {
    super(props)
    console.log('[App.js] Inside Constructor', props)
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()')
  }

  componentDidMount() {
    console.log('[App.js] inside componentDidMount')
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState)
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js Inside componentWillUpdate', nextProps, nextState)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js Inside getDerivedStateFromProps', nextProps, prevState)

    return prevState
  }

  getSnapshotBeforeUpdate() {
    console.log('[UPDATE App.js Inside getSnapshotBeforeUpdate')
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js Inside componentDidUpdate')
  }

  state = {
    persons: [
      { id: 'aw46bw4', name: 'Max', age: 28 },
      { id: 'vbaawfa', name: 'Manu', age: 29 },
      { id: 't4n7uma', name: "Stephanie", age: 26 }
    ],
    otherState: 'Some other value',
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
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
    this.setState( (prevState, props) => { 
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    })
  }

  loginHandler = () => {
    this.setState({ authenticated: true })
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

    console.log('[App.js] inside render')

    let persons = null;

    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
      )
    }

    return (
      <>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
          title={this.props.title} 
          showPersons={this.state.showPersons} 
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler}
        />
        <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
        </>
    );
  }

}

export default withClass(App, classes.App)
