"use client"

import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { motion, AnimatePresence } from "motion/react"
import { LayoutGrid } from "lucide-react"
import { useLocalTheme } from '../../context/useLocalTheme'
import { getSubcampanias } from '../../services/leads.service'
import ColumnCustomizer from '../leads/ColumnCustomizer'

function LeadFilters({ onSearch, columns, setColumns, columnFilters, setColumnFilters, leads = [] }) {

  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const [fecha, setFecha] = useState(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })

  const [idCamp, setIdCamp] = useState(null)
  const [subcampanias, setSubcampanias] = useState([])
  const [iniCampania, setIniCampania] = useState('')
  const [showColumnPanel, setShowColumnPanel] = useState(false)
//filtros front
const fechasDisponibles = [
  ...new Set(
    leads
      .map(x => x.fecha_creaciondia?.slice(0,10))
      .filter(Boolean)
  )
].sort()
const mejoresResultados = [
  ...new Set(
    leads
      .map(x => x.mejornivel2)
      .filter(Boolean)
  )
].sort()
const ultimosResultados = [
  ...new Set(
    leads
      .map(x => x.ultnivel2)
      .filter(Boolean)
  )
].sort()
const calcularDiasSinLlamar = (fecha) => {

  if (!fecha) return 9999

  const hoy = new Date()
  const ultima = new Date(fecha)

  return Math.floor(
    (hoy - ultima) / (1000 * 60 * 60 * 24)
  )
}
const diasSinLlamarDisponibles = [
  ...new Set(
    leads
      .filter(x => x.ult_fecha)
      .map(x => calcularDiasSinLlamar(x.ult_fecha))
  )
].sort((a, b) => a - b)
const gestiones = [
  ...new Set(
    leads.map(x => x.gestiones ?? 0)
  )
].sort((a, b) => a - b)

  // cargar campaña y subcampañas
useEffect(() => {

  const params = new URLSearchParams(window.location.search)
  const campFromURL = params.get("camp")

const campanaSeleccionada = JSON.parse(
  localStorage.getItem('campanaSeleccionada') || '{}'
)

const finalCamp =
  campFromURL ||
  localStorage.getItem('id_camp') ||
  campanaSeleccionada.id_camp

if (!finalCamp) return

  const parsedCamp = parseInt(finalCamp)
  setIdCamp(parsedCamp)

getSubcampanias(parsedCamp)
  .then(data => {

    setSubcampanias(
      Array.isArray(data)
        ? data
        : []
    )

    setIniCampania('')

  })
    .catch(err => {
      console.error('Error cargando subcampañas:', err)
      setSubcampanias([])
    })

}, [])

  const handleSubmit = (e) => {
    e.preventDefault()
{/*
    if (!fecha) {
      alert('Debe seleccionar una fecha')
      return
    }
 */}
    if (!idCamp) {
      alert('No hay campaña seleccionada')
      return
    }

    onSearch({
      IdCamp: idCamp,
      inicampania: iniCampania
    })
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`w-full p-4 rounded-xl shadow-md mb-6 transition-all duration-300 ${
        isDark
          ? 'bg-slate-800 shadow-black/20 hover:shadow-black/40'
          : 'bg-white shadow-slate-200 hover:shadow-slate-300'
      }`}
    >

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-end justify-between flex-wrap"
      >

        <div className="flex flex-col sm:flex-row gap-4 items-end flex-wrap">


          {/* SUBCAMPAÑA */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="flex flex-col w-64"
          >

            <label className="text-sm mb-1 font-medium">
              Inicampania
            </label>

            <motion.select
              value={iniCampania}
              onChange={(e) => setIniCampania(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              className={`px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 focus:ring-2 ${
                isDark
                  ? 'bg-slate-700 text-white border-slate-600 focus:ring-blue-500/40'
                  : 'bg-slate-100 text-slate-800 border-slate-300 focus:ring-blue-400/40'
              }`}
            >

              <option value="">Selecciona</option>

              {subcampanias.map((item) => {
  if (!item?.ini_campania) return null

  return (
    <option
      key={item.ini_campania}
      value={item.ini_campania}
    >
      {item.ini_campania}
    </option>
  )
})}

            </motion.select>

          </motion.div>

{/* Filtros del front */}
<motion.div className="flex flex-col w-56">

  <label className="text-sm mb-1 font-medium">
    Fecha Ingreso
  </label>

  <select
    value={columnFilters.fecha_creaciondia}
    onChange={(e) =>
      setColumnFilters(prev => ({
        ...prev,
        fecha_creaciondia: e.target.value
      }))
    }
    className="px-3 py-2 rounded-lg border"
  >

    <option value="">Todos</option>

    {fechasDisponibles.map(valor => (
      <option key={valor} value={valor}>
        {valor}
      </option>
    ))}

  </select>

</motion.div>

<motion.div className="flex flex-col w-56">

  <label className="text-sm mb-1 font-medium">
    ultimo nivel
  </label>

  <select
    value={columnFilters.ultnivel2}
    onChange={(e) =>
      setColumnFilters(prev => ({
        ...prev,
        ultnivel2: e.target.value
      }))
    }
    className="px-3 py-2 rounded-lg border"
  >

    <option value="">Todos</option>

    {ultimosResultados.map(valor => (
      <option key={valor} value={valor}>
        {valor}
      </option>
    ))}

  </select>

</motion.div>


<motion.div className="flex flex-col w-56">

  <label className="text-sm mb-1 font-medium">
    Mejor resultado
  </label>

  <select
    value={columnFilters.mejornivel2}
    onChange={(e) =>
      setColumnFilters(prev => ({
        ...prev,
        mejornivel2: e.target.value
      }))
    }
    className="px-3 py-2 rounded-lg border"
  >

    <option value="">Todos</option>

    {mejoresResultados.map(valor => (
      <option key={valor} value={valor}>
        {valor}
      </option>
    ))}

  </select>

</motion.div>
<motion.div className="flex flex-col w-56">

  <label className="text-sm mb-1 font-medium">
    Días sin llamar
  </label>

  <select
    value={columnFilters.diasSinLlamar}
    onChange={(e) =>
      setColumnFilters(prev => ({
        ...prev,
        diasSinLlamar: e.target.value
      }))
    }
    className="px-3 py-2 rounded-lg border"
  >
    <option value="">Todos</option>

    {diasSinLlamarDisponibles.map(dias => (
      <option key={dias} value={dias}>
        {dias === 0
          ? 'Hoy'
          : dias === 1
          ? 'Hace 1 día'
          : `Hace ${dias} días`}
      </option>
    ))}

  </select>

</motion.div>
<motion.div className="flex flex-col w-56">

  <label className="text-sm mb-1 font-medium">
    Gestiones
  </label>

  <select
    value={columnFilters.gestiones}
    onChange={(e) =>
      setColumnFilters(prev => ({
        ...prev,
        gestiones: e.target.value
      }))
    }
    className="px-3 py-2 rounded-lg border"
  >

    <option value="">Todos</option>

    {gestiones.map(valor => (
      <option key={valor} value={valor}>
        {valor}
      </option>
    ))}

  </select>

</motion.div>

          {/* BOTÓN BUSCAR */}
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
              isDark
                ? 'bg-[#74F2F2] text-black hover:bg-[#30BABA]'
                : 'bg-[#354196] text-white hover:bg-[#1f3147]'
            }`}
          >

            <motion.span
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center"
            >
              <FiSearch />
            </motion.span>

            Buscar

          </motion.button>

        </div>

        {/* PANEL DE COLUMNAS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="relative"
        >

          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260 }}
            onClick={() => setShowColumnPanel(!showColumnPanel)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border shadow-sm transition-all duration-200 hover:shadow-md ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >

            <motion.span
              animate={{ rotate: showColumnPanel ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <LayoutGrid size={18} />
            </motion.span>

            Vista

          </motion.button>

          <AnimatePresence>

            {showColumnPanel && (

              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 z-50"
              >

                <ColumnCustomizer
                  columns={columns}
                  setColumns={setColumns}
                  show={showColumnPanel}
                  setShow={setShowColumnPanel}
                />

              </motion.div>

            )}

          </AnimatePresence>

        </motion.div>

      </form>

    </motion.div>

  )

}

export default LeadFilters