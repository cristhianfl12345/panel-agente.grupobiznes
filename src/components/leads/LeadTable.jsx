import { useState, useMemo } from 'react'
import LeadRow from './LeadRow'
import { useLocalTheme } from '../../context/useLocalTheme'

export default function LeadTable({ leads = [], loading, searched }) {
  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const rowsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(leads.length / rowsPerPage)

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    const end = start + rowsPerPage
    return leads.slice(start, end)
  }, [leads, currentPage])

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="w-full h-[calc(100vh-220px)] flex flex-col">

      {/* TABLA */}
      <div className="flex-1 overflow-auto">
        <table
          className={`
            min-w-full border text-xs transition-colors
            ${isDark
              ? 'border-slate-700 text-slate-200'
              : 'border-slate-300 text-slate-800'}
          `}
        >

  <thead className={`${isDark ? 'bg-slate-800' : 'bg-gray-100'} sticky top-0 z-10`}>
  <tr>

    <th className="p-2 border text-center">#</th>
    <th className="p-2 border">IdKey</th>
    <th className="p-2 border">Perfil</th>
    <th className="p-2 border">Customer Origin</th>
    <th className="p-2 border text-center">U. Reg</th>
    <th className="p-2 border">Fono</th>
    <th className="p-2 border">Plt</th>
    <th className="p-2 border">A.</th>
    <th className="p-2 border">Name Anuncio</th>
    <th className="p-2 border">Reg</th>

    <th className="p-2 border text-center">D.</th>
    <th className="p-2 border text-center">G.</th>

    <th className="p-2 border text-center">Ult Nivel</th>
    <th className="p-2 border text-center">🔊</th>

    <th className="p-2 border text-center">Mejor Nivel</th>
    <th className="p-2 border text-center">🔊</th>

    <th className="p-2 border text-center">Atención</th>
    <th className="p-2 border text-center">W.</th>
    <th className="p-2 border text-center">W Mejor Nivel</th>
    <th className="p-2 border text-center">Obs</th>

  </tr>
</thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan="24" className="text-center p-4">
                  Cargando...
                </td>
              </tr>
            )}

            {!loading && !searched && (
              <tr>
                <td colSpan="24" className={`text-center p-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  Elige una fecha
                </td>
              </tr>
            )}

            {!loading && searched && leads.length === 0 && (
              <tr>
                <td colSpan="24" className={`text-center p-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  No hay registros
                </td>
              </tr>
            )}

            {!loading && paginatedLeads.length > 0 &&
              paginatedLeads.map((lead, index) => (
  <LeadRow
    key={lead.idkey}
    lead={lead}
    index={
  leads.length -
  ((currentPage - 1) * rowsPerPage + index)
}
  />
))
            }

          </tbody>
        </table>
      </div>

{/* PAGINACIÓN */}
{!loading && leads.length > 0 && (
  <div className="flex justify-center items-center gap-2 p-4 border-t flex-wrap">

    {/* Botón anterior */}
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 rounded border disabled:opacity-40"
    >
      «
    </button>

    {/* Números de página */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => goToPage(page)}
        className={`px-3 py-1 rounded border ${
          currentPage === page
            ? 'bg-blue-600 text-white'
            : 'hover:bg-slate-200'
        }`}
      >
        {page}
      </button>
    ))}

    {/* Botón siguiente */}
    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-1 rounded border disabled:opacity-40"
    >
      »
    </button>

  </div>
)}

    </div>
  )
}