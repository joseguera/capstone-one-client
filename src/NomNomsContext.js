import React from 'react'

const NomNomsContext = React.createContext({
  noms: [],
  recipes: [],
  addNom: () => {},
  addRecipe: () => {},
  deleteNom: () => {},
  deleteRecipe: () => {},
  updateNom: () => {},
  updateRecipe: () => {}
})

export default NomNomsContext