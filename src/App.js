import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import NomList from './NomList/NomList'
import AddNom from './AddNom/AddNom'
import Recipe from './Recipes/Recipes'
import Users from './Users/Users'
import Error from './Error'
import NomsContext from './NomsContext'
import config from './config'

class App extends Component {
  state = {
    noms: [],
    error: null
  }

  setNoms = noms => {
    this.setState({
      noms,
      error: null
    })
  }

  addNom = nom => {
    this.setState({
      noms: [...this.state.noms, nom]
    })
  }

  deleteNom = nomId => {
    const newNoms = this.state.noms.filter(nom =>
      nom.id !== nomId  
    )
    this.setState({
      noms: newNoms
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setNoms)
      .catch(error => {
        console.log(error)
        this.setState({ error })
      })
  }

  updateNom = updatedNom => {
    this.setState({
      noms: this.state.noms.map(nom =>
        (nom.id !== updatedNom.id) ? nom : updatedNom
      )
    })
  }

  render() {
    const contextValue = {
      noms: this.state.noms,
      addNom: this.addNom,
      deleteNom: this.deleteNom,
      updatedNom: this.updateNom
    }
    return (
      <main className='App'>
        <NomsContext.Provider value={contextValue}>
          <Navigation />
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/nomlist' component={NomList} />
            <Route path='/add-nom' component={AddNom} />
            <Route path='/recipes/:recipe_id' component={Recipe} />
            <Route path='/users/:user_id' component={Users} />
            <Route component={Error} />
          </div>
        </NomsContext.Provider>
      </main>
    )
  }
}

export default App;