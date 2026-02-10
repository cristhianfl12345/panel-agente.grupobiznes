import { useState } from 'react'
import ReniecSearchForm from '../components/ReniecSearchForm'
import ReniecResults from '../components/ReniecResults'
import ReniecDetalle from '../components/ReniecDetalle'
import { buscarReniec, obtenerDetalleReniec } from '../services/reniecService'
import Header from '../routes/header.jsx'
import { useLocalTheme } from '../context/useLocalTheme'

export default function Reniec() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])
  const [detalle, setDetalle] = useState(null)

  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const handleSearch = async (params) => {
    try {
      setLoading(true)
      setError('')
      setDetalle(null)

      const res = await buscarReniec(params)
      setResults(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = async (dni) => {
    try {
      setLoading(true)
      setError('')

      const res = await obtenerDetalleReniec(dni)
      setDetalle(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`
        min-h-screen transition-colors
        ${isDark
          ? 'bg-[#1F2029] text-white'
          : 'bg-slate-50 text-slate-800'}
      `}
    >
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark
                ? 'from-yellow-400 to-amber-400'
                : 'from-violet-600 to-purple-500'
            }`}
          >
            Busqueda de Usuarios
          </span>
        </h1>

        <ReniecSearchForm onSearch={handleSearch} loading={loading} />

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}

        <div className="flex flex-col gap-[10px] mt-4">
          <ReniecResults results={results} onSelect={handleSelect} />
          <ReniecDetalle detalle={detalle} />
        </div>
      </div>
    </div>
  )
}
