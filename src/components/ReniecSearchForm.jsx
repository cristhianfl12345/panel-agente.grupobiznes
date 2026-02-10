import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useLocalTheme } from '../context/useLocalTheme'

export default function ReniecSearchForm({ onSearch, loading }) {
  const [tipo, setTipo] = useState('DNI')
  const [dni, setDni] = useState('')
  const [nombres, setNombres] = useState('')
  const [apPat, setApPat] = useState('')
  const [apMat, setApMat] = useState('')

  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (tipo === 'DNI' && !dni.trim()) return
    if (tipo === 'NOMBRE_COMPLETO' && (!nombres || !apPat || !apMat)) return
    if (tipo === 'APELLIDOS' && !apPat && !apMat) return

    onSearch({
      tipo,
      dni: dni.trim(),
      nombres: nombres.trim(),
      ap_pat: apPat.trim(),
      ap_mat: apMat.trim()
    })
  }

  const input = `
    w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2
    ${isDark
      ? 'bg-slate-800 border-slate-700 text-white focus:ring-yellow-400'
      : 'bg-white border-slate-200 text-slate-800 focus:ring-violet-500'}
  `

  const tab = (active) =>
    `flex-1 py-2 rounded-xl text-sm font-medium transition ${
      active
        ? isDark
          ? 'bg-yellow-400 text-slate-900 shadow'
          : 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow'
        : isDark
          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        rounded-2xl shadow-lg p-6 space-y-6
        ${isDark ? 'bg-slate-900' : 'bg-white'}
      `}
    >
      {/* Tabs */}
      <div>
        <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Tipo de Búsqueda
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTipo('DNI')}
            className={`cursor-pointer ${tab(tipo === 'DNI')}`}
          >
            DNI
          </button>
          <button
            type="button"
            onClick={() => setTipo('NOMBRE_COMPLETO')}
            className={`cursor-pointer ${tab(tipo === 'NOMBRE_COMPLETO')}`}
          >
            Nombre Completo
          </button>
          <button
            type="button"
            onClick={() => setTipo('APELLIDOS')}
            className={`cursor-pointer ${tab(tipo === 'APELLIDOS')}`}
          >
            Apellidos
          </button>
        </div>
      </div>

      {/* Inputs */}
      {tipo === 'DNI' && (
        <div>
          <label className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Número de DNI
          </label>
          <input
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className={input}
            placeholder="Ej: 87654321"
          />
        </div>
      )}

      {tipo === 'NOMBRE_COMPLETO' && (
        <div className="space-y-4">
          <input
            className={input}
            placeholder="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              className={input}
              placeholder="Apellido paterno"
              value={apPat}
              onChange={(e) => setApPat(e.target.value)}
            />
            <input
              className={input}
              placeholder="Apellido materno"
              value={apMat}
              onChange={(e) => setApMat(e.target.value)}
            />
          </div>
        </div>
      )}

      {tipo === 'APELLIDOS' && (
        <div className="grid grid-cols-2 gap-4">
          <input
            className={input}
            placeholder="Apellido paterno"
            value={apPat}
            onChange={(e) => setApPat(e.target.value)}
          />
          <input
            className={input}
            placeholder="Apellido materno"
            value={apMat}
            onChange={(e) => setApMat(e.target.value)}
          />
        </div>
      )}

      {/* Button */}
      <button
        disabled={loading}
        className={`
          w-full flex items-center justify-center gap-2
          rounded-xl py-3 font-semibold ${isDark ? 'text-slate-800' : 'text-slate-100'}
          ${isDark
            ? 'bg-yellow-400 text-slate-900'
            : 'bg-gradient-to-r from-violet-600 to-purple-500'}
          hover:opacity-90 transition disabled:opacity-50 cursor-pointer 
        `}
      >
        <FiSearch />
        {loading ? 'Buscando...' : 'Realizar Búsqueda'}
      </button>
    </form>
  )
}
