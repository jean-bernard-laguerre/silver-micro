import { useState, useCallback, useMemo } from 'react'
import AuthContext from './contexts/authContext'
import './App.css'

import Auth from './services/api/auth'
import Users from './services/api/users'
import Restaurants from './services/api/restaurants'
import Responsables from './services/api/responsables'
import Reservations from './services/api/reservations'
import Avis from './services/api/avis'

function App() {

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')) : null
  )

  const login = useCallback((user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setCurrentUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }, [])

  const connect = () => {
    Auth.login("Dwight.Sauer74@hotmail.com", "test")
    .then(response => {
      localStorage.setItem('token', response.token)
      login(response.user)
    })
  }

  const authValue = useMemo(() => ({
    currentUser,
    login,
    logout
  }), [currentUser, login, logout])

  return (
    <AuthContext.Provider value={authValue}>
      <div>
        <h2>{currentUser ? currentUser.username : 'No user connected'}</h2>
      </div>
      <div>
        <button onClick={connect}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <button onClick={Users.get}>Get Users</button>
        <button onClick={Restaurants.get}>Get Restaurants</button>
        <button onClick={Responsables.get}>Get Responsables</button>
        <button onClick={Reservations.get}>Get Reservations</button>
        <button onClick={Avis.get}>Get Avis</button>
      </div>
    </AuthContext.Provider>
  )
}

export default App
