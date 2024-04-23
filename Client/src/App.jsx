import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Auth from './services/api/auth'

function App() {
  const [count, setCount] = useState(0)

  const login = () => {
    Auth.login(
      'Dwight.Sauer74@hotmail.com', 
      'test')
  }

  const register = () => {
    Auth.register(
      'testUser',
      'test@test.fr',
      'test')
  }


  return (
    <>
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </>
  )
}

export default App
