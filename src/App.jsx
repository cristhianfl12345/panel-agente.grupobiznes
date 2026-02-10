import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Login from './routes/Login'
import AddUser from './routes/AddUser'
import Home from './routes/Home'
import ProtectedRoute from '../components/ProtectedRoute'
import PlatformRoute from './components/PlatformRoute'
import Reniec from './pages/Reniec'
import Monitor from './routes/Monitor'
import Carterizacion from './routes/Carterizacion'
import { KeepAliveProvider } from './context/KeepAliveContext'
import Header from './routes/header.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

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

        {/* redirect por defecto */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
