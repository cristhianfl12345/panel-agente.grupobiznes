import { FiUser } from 'react-icons/fi'
import { useLocalTheme } from '../context/useLocalTheme'

export default function ReniecResults({ results, onSelect }) {
  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  if (!results.length) return null

  return (
    <div className={`rounded-2xl shadow-lg p-6 ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      <h3
        className={`font-semibold mb-4 flex items-center gap-2 ${
          isDark ? 'text-yellow-400' : 'text-violet-600'
        }`}
      >
        <FiUser />
        Resultados
      </h3>

      <div className="space-y-3">
        {results.map(p => (
          <div
            key={p.dni}
            className={`flex justify-between rounded-xl px-3 py-3 border ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'
            }`}
          >
            <div className="flex-1 space-y-1">
              <div className="grid grid-cols-[25%_1fr] gap-2">
                <div>
                  <p className="text-xs text-slate-500">DNI</p>
                  <p className="font-medium">{p.dni}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Nombre</p>
                  <p className="font-medium">
                    {p.ap_pat} {p.ap_mat}, {p.nombres}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelect(p.dni)}
              className={`ml-3 cursor-pointer whitespace-nowrap hover:underline ${
                isDark ? 'text-yellow-400' : 'text-violet-500'
              }`}
            >
              Ver detalle
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}
