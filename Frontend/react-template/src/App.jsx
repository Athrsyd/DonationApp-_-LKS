import { useState } from 'react'
import AdminContext from './Context/AdminContext'
import RouteConfig from './Route'

function App() {

  return (
    <div className="App">
      <AdminContext.Provider value={{ isAdmin: false }}>
        <RouteConfig />
      </AdminContext.Provider>
    </div>
  )
}

export default App
