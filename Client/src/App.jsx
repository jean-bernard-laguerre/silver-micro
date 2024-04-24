import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Auth from './services/api/auth'
import User from './services/api/users'
import Restaurant from './services/api/restaurants'
import Responsable from './services/api/responsables'
import Reservation from './services/api/reservations'
import Avis from './services/api/avis'

function App() {
  const [count, setCount] = useState(0)

  const login = () => {
    Auth.login(
      'Dwight.Sauer74@hotmail.com', 
      'test')
  }

  const logout = () => {
    localStorage.removeItem('token')
  }

  const register = () => {
    Auth.register(
      'testUser',
      'test@test.fr',
      'test')
  }




  return (
    <>
      <div>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        <button onClick={register}>Register</button>
      </div>
      <div>
        <button onClick={User.get}>Get Users</button>
        <button onClick={Restaurant.get}>Get Restaurants</button>
        <button onClick={Responsable.get}>Get Responsables</button>
        <button onClick={Reservation.get}>Get Reservations</button>
        <button onClick={Avis.get}>Get Avis</button>
      </div>
    </>
  )
}

export default App
