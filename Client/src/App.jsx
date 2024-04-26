import { useState, useCallback, useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AuthContext from './contexts/authContext'
import './App.css'


import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Reservations from './pages/reservations'
import Profile from './pages/profile'
import AdminRestaurants from './pages/admin/restaurants'
import AdminRestaurant from './pages/admin/restaurant';
import { Button } from './components/ui/button';

const routes = [
  { path: '/', element: <Home/> },
  { path: '/login', element: <Login/> },
  { path: '/register', element: <Register/> },
  { path: '/reservations', element: <Reservations/> },
  { path: '/profile', element: <Profile/> },
  { path: '/admin', element: <AdminRestaurants/> },
  { path: '/admin/restaurant/:id', element: <AdminRestaurant/> },
]

const router = createBrowserRouter(routes, {
  basename: '/'
})

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
      <RouterProvider 
        router={router}
      />        
    </AuthContext.Provider>
  )
}

export default App
