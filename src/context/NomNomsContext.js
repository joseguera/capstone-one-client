import React from 'react'

const NomNomsContext = React.createContext({
  noms: [],
  addNom: () => {},
  deleteNom: () => {},
  updateNom: () => {},
})

export default NomNomsContext;