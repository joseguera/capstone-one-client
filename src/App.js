import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation/Navigation'
import Home from './Home/Home'
import NomList from './NomList/NomList'
import AddNom from './AddNom/AddNom'
import EditNom from './EditNom/EditNom'
import RecipeList from './RecipeList/RecipeList'
import AddRecipe from './AddRecipe/AddRecipe'
import EditRecipe from './EditRecipe/EditRecipe'
import Users from './Users/Users'
import Error from './Error'
import NomNomsContext from './NomNomsContext'
import config from './config'

class App extends Component {
  state = {
    noms: [],
    recipes: [],
    error: null
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    };

    Promise.all([
      fetch(`${config.API_ENDPOINT}/noms`, requestOptions),
      fetch(`${config.API_ENDPOINT}/recipes`, requestOptions)
    ])
      .then(([nomsRes, recipesRes]) => {
        if (!nomsRes.ok)
          return nomsRes.json().then(e => Promise.reject(e))
        if (!recipesRes.ok)
          return recipesRes.json().then(e => Promise.reject(e))

        return Promise.all([
          nomsRes.json(),
          recipesRes.json(),
        ])
      })
      .then(([noms, recipes]) => {
        this.setState({ noms, recipes })
      })
      .catch(error => {
        console.error({ error })
      })
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

  updateNom = updatedNom => {
    this.setState({
      noms: this.state.noms.map(nom =>
        (nom.id !== updatedNom.id) ? nom : updatedNom
      )
    })
  }

  setRecipes = recipes => {
    this.setState({
      recipes,
      error: null
    })
  }

  addRecipe = recipe => {
    this.setState({
      recipes: [...this.state.recipes, recipe]
    })
  }

  deleteRecipe = recipeId => {
    const newRecipes = this.state.recipes.filter(recipe =>
      recipe.id !== recipeId  
    )
    this.setState({
      recipes: newRecipes
    })
  }

  updateRecipe = updatedRecipe => {
    this.setState({
      recipes: this.state.recipes.map(recipe =>
        (recipe.id !== updatedRecipe.id) ? recipe : updatedRecipe
      )
    })
  }

  render() {
    const contextValue = {
      noms: this.state.noms,
      recipes: this.state.recipes,
      addNom: this.addNom,
      addRecipe: this.addRecipe,
      deleteNom: this.deleteNom,
      deleteRecipe: this.deleteRecipe,
      updateNom: this.updateNom,
      updateRecipe: this.updateRecipe
    }
    return (
      <main className='App'>
        <NomNomsContext.Provider value={contextValue}>
          <Navigation />
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/nomlist' component={NomList} />
            <Route path='/add-nom' component={AddNom} />
            <Route path='/edit-nom/:nomId' component={EditNom} />
            <Route path='/recipelist' component={RecipeList} />
            <Route path='/add-recipe' component={AddRecipe} />
            <Route path='/edit-recipe/:recipeId' component={EditRecipe} />
            <Route path='/users/:user_id' component={Users} />
            <Route component={Error} />
          </div>
        </NomNomsContext.Provider>
      </main>
    )
  }
}

export default App;