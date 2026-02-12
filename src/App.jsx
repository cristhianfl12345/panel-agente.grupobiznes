import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import Header from './routes/header.jsx'

function App() {
  const isAuth = localStorage.getItem('auth')

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN (bloqueado si ya hay sesión) */}
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

        {/* REDIRECCIÓN INTELIGENTE POR DEFECTO */}
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
    </BrowserRouter>
  )
}

export default App
