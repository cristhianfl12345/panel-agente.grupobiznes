"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLocalTheme } from "../context/useLocalTheme"
import { useEffect, useState } from "react"

export default function Loader({ show = true }) {

  const { theme } = useLocalTheme()
  const isDark = theme === "dark"

  const [visible, setVisible] = useState(show)
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {

    if (show) {
      setVisible(true)
      setStartTime(Date.now())
    } else {

      const elapsed = Date.now() - (startTime || 0)
      const remaining = Math.max(1000 - elapsed, 0)

      const timer = setTimeout(() => {
        setVisible(false)
      }, remaining)

      return () => clearTimeout(timer)
    }

  }, [show])

  if (!visible) return null

  const spinnerColor = isDark ? "#6E1F1F" : "#D11F1F"

  return (

    <AnimatePresence>

      {visible && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`
            fixed inset-0 z-[9999]
            flex items-center justify-center
            backdrop-blur-lg
            ${isDark ? "bg-black/80" : "bg-white/80"}
          `}
        >

          <div className="relative flex items-center justify-center">

            {/* círculo progreso */}

            <motion.div
              className="absolute w-44 h-44 rounded-full border-[6px]"
              style={{
                borderColor: `${spinnerColor}30`,
                borderTopColor: spinnerColor
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.15,
                ease: "linear"
              }}
            />

            {/* glow animado */}

            <motion.div
              className="absolute w-56 h-56 rounded-full blur-3xl"
              style={{
                backgroundColor: spinnerColor + "25"
              }}
              animate={{
                scale: [1, 1.12, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut"
              }}
            />

            {/* logo */}

            <motion.img
              src="/biznesss.png"
              alt="Bizness Loader"
              className="w-24 h-24 object-contain select-none"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1]
              }}
              draggable={false}
            />

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}