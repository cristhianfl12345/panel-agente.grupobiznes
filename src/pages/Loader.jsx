"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLocalTheme } from "../context/useLocalTheme"

export default function Loader({ show = true }) {

  const { theme } = useLocalTheme()
  const isDark = theme === "dark"

  if (!show) return null

  return (

    <AnimatePresence>

      {show && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`
            fixed inset-0 z-[9999]
            flex items-center justify-center
            backdrop-blur-md
            ${isDark
              ? "bg-black/40"
              : "bg-white/40"}
          `}
        >

          <div className="relative flex items-center justify-center">

            {/* círculo animado */}

            <motion.div
              className={`
                absolute
                w-36 h-36
                rounded-full
                border-4
                ${isDark
                  ? "border-white/30 border-t-white"
                  : "border-black/30 border-t-black"}
              `}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 1.2
              }}
            />

            {/* glow */}

            <motion.div
              className={`
                absolute
                w-44 h-44
                rounded-full
                blur-2xl
                ${isDark
                  ? "bg-white/10"
                  : "bg-black/10"}
              `}
              animate={{
                scale: [1, 1.08, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />

            {/* logo */}

            <motion.img
              src="/biznesss.png"
              alt="Bizness Loader"
              className="w-20 h-20 object-contain select-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut"
              }}
              draggable={false}
            />

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}