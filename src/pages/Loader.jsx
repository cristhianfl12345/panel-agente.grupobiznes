"use client"

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion"

import { useLocalTheme } from "../context/useLocalTheme"
import { useEffect, useState } from "react"

export default function Loader({ show = true }) {

  const { theme } = useLocalTheme()
  const isDark = theme === "dark"

  const [visible, setVisible] = useState(show)
  const [startTime, setStartTime] = useState(null)
  const [progress, setProgress] = useState(0)

  const motionProgress = useMotionValue(0)

  const smoothProgress = useSpring(motionProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.6
  })

  const size = 180
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const strokeDashoffset = useTransform(
    smoothProgress,
    (v) => circumference - (v / 100) * circumference
  )

  const spinnerColor = isDark ? "#6E1F1F" : "#D11F1F"

  useEffect(() => {

    let interval

    if (show) {

      setVisible(true)
      setStartTime(Date.now())
      setProgress(0)
      motionProgress.set(0)

      interval = setInterval(() => {

        setProgress((prev) => {

          const next = prev + Math.random() * 7

          const limited = Math.min(next, 95)

          motionProgress.set(limited)

          return limited
        })

      }, 120)

    } else {

      motionProgress.set(100)
      setProgress(100)

      const elapsed = Date.now() - (startTime || 0)
      const remaining = Math.max(1000 - elapsed, 0)

      const timer = setTimeout(() => {

        setVisible(false)
        setProgress(0)
        motionProgress.set(0)

      }, remaining)

      return () => clearTimeout(timer)

    }

    return () => clearInterval(interval)

  }, [show])

  if (!visible) return null

  return (

    <AnimatePresence>

      {visible && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`
            fixed inset-0 z-[9999]
            flex items-center justify-center
            backdrop-blur-lg
            ${isDark ? "bg-black/70" : "bg-white/70"}
          `}
        >

          <div className="flex flex-col items-center gap-6">

            <div className="relative flex items-center justify-center">

              {/* glow */}

              <motion.div
                className="absolute w-[220px] h-[220px] rounded-full blur-3xl"
                style={{ backgroundColor: spinnerColor + "22" }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut"
                }}
              />

              {/* progress circle */}

              <svg
                width={size}
                height={size}
                className="absolute -rotate-90"
              >

                <circle
                  stroke={spinnerColor + "25"}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={radius}
                  cx={size / 2}
                  cy={size / 2}
                />

                <motion.circle
                  stroke={spinnerColor}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  r={radius}
                  cx={size / 2}
                  cy={size / 2}
                  strokeDasharray={circumference}
                  style={{
                    strokeDashoffset
                  }}
                />

              </svg>

              {/* logo */}

              <motion.img
                src="/biznesss.png"
                alt="Bizness Loader"
                className="w-28 h-28 object-contain select-none"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1]
                }}
                draggable={false}
              />

            </div>

            {/* porcentaje */}

            <motion.div
  className={`text-lg font-semibold tracking-wide translate-y-[6px] ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  {Math.round(progress)}%
</motion.div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}