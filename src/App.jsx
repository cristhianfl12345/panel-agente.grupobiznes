import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Login from './routes/Login'
import AddUser from './routes/AddUser'
import Home from './routes/Home'

import ProtectedRoute from '../components/ProtectedRoute'
import PublicRoute from '../components/PublicRoute'
import PlatformRoute from './components/PlatformRoute'

import Reniec from './pages/Reniec'
import Monitor from './routes/Monitor'
import Carterizacion from './routes/Carterizacion'

import { KeepAliveProvider } from './context/KeepAliveContext'

import Loader from './pages/Loader'
import Header from './routes/header.jsx'


function AppRoutes() {

  const location = useLocation()
  const [loadingRoute, setLoadingRoute] = useState(false)

  const isAuth = localStorage.getItem('auth')

  useEffect(() => {

    setLoadingRoute(true)

    const timer = setTimeout(() => {
      setLoadingRoute(false)
    }, 400)

    return () => clearTimeout(timer)

  }, [location.pathname])


  return (
    <>
      {/* LOADER GLOBAL */}
      <Loader show={loadingRoute} />

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* adduser 
        <Route
          path="/add-user"
          element={
            <PublicRoute>
              <AddUser />
            </PublicRoute>
          }
        /> */}

        {/* HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <KeepAliveProvider>
                <Home />
              </KeepAliveProvider>
            </ProtectedRoute>
          }
        />

        {/* BUSQUEDA */}
        <Route
          path="/reniec"
          element={
            <ProtectedRoute>
              <KeepAliveProvider>
                <PlatformRoute feature="busqueda">
                  <Reniec />
                </PlatformRoute>
              </KeepAliveProvider>
            </ProtectedRoute>
          }
        />

        {/* MONITOR */}
        <Route
          path="/monitor"
          element={
            <ProtectedRoute>
              <KeepAliveProvider>
                <PlatformRoute feature="monitor">
                  <Monitor />
                </PlatformRoute>
              </KeepAliveProvider>
            </ProtectedRoute>
          }
        />

        {/* CARTERIZACION */}
        <Route
          path="/cartera"
          element={
            <ProtectedRoute>
              <KeepAliveProvider>
                <PlatformRoute feature="cartera">
                  <Carterizacion />
                </PlatformRoute>
              </KeepAliveProvider>
            </ProtectedRoute>
          }
        />

        {/* REDIRECCIÓN */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuth ? "/home" : "/login"}
              replace
            />
          }
        />

      </Routes>
    </>
  )
}


function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App