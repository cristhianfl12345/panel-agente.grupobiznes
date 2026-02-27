import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useLocalTheme } from '../../context/useLocalTheme'
import { getSubcampanias } from '../../services/leads.service'

function LeadFilters({ onSearch }) {

  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const [fecha, setFecha] = useState('')
  const [idCamp, setIdCamp] = useState(null)
  const [subcampanias, setSubcampanias] = useState([])
  const [iniCampania, setIniCampania] = useState('')

  // 🔥 Cargar campaña y subcampañas
  useEffect(() => {

    const storedCamp = localStorage.getItem('id_campana')

    if (storedCamp) {
      const parsedCamp = parseInt(storedCamp)
      setIdCamp(parsedCamp)

      getSubcampanias(parsedCamp)
        .then(data => {
          setSubcampanias(data)
        })
        .catch(err => {
          console.error('Error cargando subcampañas:', err)
        })
    }

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!fecha) {
      alert('Debe seleccionar una fecha')
      return
    }

    if (!idCamp) {
      alert('No hay campaña seleccionada')
      return
    }

    onSearch({
      IdCamp: idCamp,
      FechaIngreso: fecha,
      IniCampania: iniCampania || null
    })
  }

  return (
    <div className={`w-full p-4 rounded-xl shadow-md mb-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">

        {/* FECHA */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 font-medium">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${
              isDark
                ? 'bg-slate-700 text-white border-slate-600'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          />
        </div>

        {/* 🔥 SUBCAMPAÑA PLEGABLE */}
        <div className="flex flex-col w-64">
          <label className="text-sm mb-1 font-medium">
            Inicampania
          </label>

          <select
            value={iniCampania}
            onChange={(e) => setIniCampania(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${
              isDark
                ? 'bg-slate-700 text-white border-slate-600'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            <option value="">Todas</option>

            {subcampanias.map((item, index) => (
              <option key={index} value={item.IniCampania}>
                {item.IniCampania}
              </option>
            ))}

          </select>
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          className={`flex items-center gap-2 px-5 py-2 rounded-lg ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-[#2C4361] hover:bg-[#1f3147] text-white'
          }`}
        >
          <FiSearch />
          Buscar
        </button>

      </form>
    </div>
  )
}

export default LeadFilters