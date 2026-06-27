import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useRef } from "react";
import Login from './routes/Login'
import AddUser from './routes/AddUser'
import Home from './routes/Home'

import ProtectedRoute from '../components/ProtectedRoute'
import PublicRoute from '../components/PublicRoute'
import PlatformRoute from './components/PlatformRoute'

import Reniec from './pages/Reniec'
import Monitor from './routes/Monitor'
import Cartera from './routes/Cartera'

import { KeepAliveProvider } from './context/KeepAliveContext'

import Loader from './pages/Loader'
import Header from './routes/header.jsx'
import NotificacionSocket from "./components/notificaciones/NotificacionSocket";


const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(6px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(6px)",
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  }
}



function AppRoutes() {

  const location = useLocation()
  const [loadingRoute, setLoadingRoute] = useState(false)
 const [noti, setNoti] = useState(null)
  const isAuth = localStorage.getItem('auth')

  useEffect(() => {

    setLoadingRoute(true)

    const timer = setTimeout(() => {
      setLoadingRoute(false)
    }, 650)

    return () => clearTimeout(timer)

  }, [location.pathname])



const audioRef = useRef(new Audio("/notificacion_sound.mp3"));

const handleNotificacion = (data) => {
  console.log("🔔 Notificación global:", data);

  // 🔊 Reproducir sonido
  audioRef.current.currentTime = 0;
  audioRef.current.play().catch((err) => {
    console.error("No se pudo reproducir el audio:", err);
  });

  setNoti(data);

  setTimeout(() => {
    setNoti(null);
  }, 4000);
};

return (
  <>
    <NotificacionSocket
      onNotificacion={handleNotificacion}
    />

    {/* 🔔 POPUP NOTIFICACIÓN ANIMADA */}
    <AnimatePresence>
      {noti && (
        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
            y: -50
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0
          }}
          exit={{
            scale: 0,
            opacity: 0,
            y: -50
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18
          }}
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999
          }}
        >
          {/* círculo contenedor */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "#fd8769",
              color: "black",
              padding: "14px 18px",
              borderRadius: "999px",
              minWidth: 320,
              boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4
            }}
          >
            <div style={{ fontWeight: 700 }}>
              Lead asignado
            </div>

            <div
              style={{
                fontSize: 13,
                opacity: 0.9,
                textAlign: "center"
              }}
            >
              {noti.mensaje}
            </div>

            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Campaña: {noti.leads?.[0]?.id_camp}
            </div>

            <div style={{ fontSize: 11, opacity: 0.6 }}>
              {new Date(noti.fecha).toLocaleTimeString()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* LOADER GLOBAL */}
      <Loader show={loadingRoute} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ height: "100%" }}
        >

          <Routes location={location}>

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
                      <Cartera />
                    </PlatformRoute>
                  </KeepAliveProvider>
                </ProtectedRoute>
              }
            />

            {/* REDIRECCIÓN */}
            <Route
  path="*"
  element={
    (() => {
      const params = new URLSearchParams(window.location.search)
      const embedKey = params.get("embedKey")

      if (embedKey) {
        return <Navigate to="/monitor" replace />
      }

      return (
        <Navigate
          to={isAuth ? "/home" : "/login"}
          replace
        />
      )
    })()
  }
/>

          </Routes>

        </motion.div>
      </AnimatePresence>
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