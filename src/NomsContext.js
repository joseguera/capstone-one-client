import React from 'react'

const NomsContext = React.createContext({
  noms: [],
  addNom: () => {},
  deleteNom: () => {},
  updateNom: () => {},
})

export default NomsContext