import {
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiUsers,
  FiTrendingUp,
  FiDownload
} from 'react-icons/fi'
import { useLocalTheme } from '../context/useLocalTheme'
import { useRef } from 'react'
import { toPng } from 'html-to-image'

export default function ReniecDetalle({ detalle }) {
  if (!detalle?.persona) return null

  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const {
    persona,
    rccOK = 0,
    rccDetalle = []
  } = detalle

  const captureRef = useRef(null)

  const handleDownload = async () => {
    if (!captureRef.current) return

    try {
      const dataUrl = await toPng(captureRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        cacheBust: true
      })

      const link = document.createElement('a')
      link.download = `detalle_${persona.Doc}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error generando imagen:', error)
    }
  }

  return (
    <div className="mt-6 space-y-4">

      {/* CONTENIDO CAPTURABLE */}
      <div
        ref={captureRef}
        className={`
          rounded-2xl shadow-lg p-6 space-y-6
          ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'}
        `}
      >

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">
        <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          <FiUser className={isDark ? 'text-yellow-400' : 'text-violet-600'} />
          Detalle de Persona
        </h3>

        {/* BOTÓN DESCARGA */}
        
          <button
            onClick={handleDownload}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium shadow transition cursor-pointer  ${
              isDark
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-violet-600 text-white hover:bg-violet-500'
            }`}
          >
            <FiDownload />
            Descargar Información
          </button>
        </div>

        {/* ================= DATOS PERSONALES ================= */}
        <div className={`rounded-xl p-4 space-y-4 text-sm ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
          <h4 className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Datos Personales
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-slate-500 flex items-center gap-1">
                <FiCreditCard /> DNI
              </p>
              <p className="font-semibold">{persona.Doc}</p>
            </div>

            <div>
              <p className="text-slate-500 flex items-center gap-1">
                <FiCalendar /> Fecha Nac.
              </p>
              <p className="font-semibold">{persona.FechaNacimiento}</p>
            </div>

            <div>
              <p className="text-slate-500">Edad</p>
              <p className="font-semibold">{persona.Edad}</p>
            </div>

            <div className="md:col-span-3">
              <p className="text-slate-500">Nombre Completo</p>
              <p className="font-semibold">
                {persona.ApellidoPaterno} {persona.ApellidoMaterno}, {persona.Nombres}
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-slate-500 flex items-center gap-1">
                <FiMapPin /> Departamento - Provincia - Distrito
              </p>
              <p className="font-semibold">
                {persona.cadena || 'No registrada'}
              </p>

              <div className="flex flex-col gap-[10px] mt-4">
                <p className="text-slate-500 flex items-center gap-1">
                  <FiMapPin /> Dirección
                </p>
                <p className="font-semibold">
                  {persona.direccion || 'No registrada'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DATOS FAMILIARES ================= */}
        <div className={`rounded-xl p-4 space-y-3 text-sm ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
          <h4 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <FiUsers className={isDark ? 'text-yellow-400' : 'text-purple-900'} />
            Datos Familiares
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500">Madre</p>
              <p className="font-semibold">{persona.madre || 'No registrada'}</p>
            </div>

            <div>
              <p className="text-slate-500">Padre</p>
              <p className="font-semibold">{persona.padre || 'No registrado'}</p>
            </div>
          </div>
        </div>

        {/* ================= FINANZAS ================= */}
        <div className={`rounded-xl p-4 text-sm space-y-3 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
          <h4 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <FiTrendingUp className={isDark ? 'text-yellow-400' : 'text-purple-900'} />
            Finanzas
          </h4>

          <div className="flex items-center gap-4">
            <div className={`text-3xl font-bold ${isDark ? 'text-yellow-400' : 'text-violet-600'}`}>
              {rccOK}
            </div>

            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`${isDark ? 'bg-yellow-400' : 'bg-violet-600'} h-2 rounded-full`}
                  style={{ width: `${Math.min(rccOK, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Status financiero (1–100)
              </p>
            </div>
          </div>
        </div>

        {/* ================= DETALLE RCC ================= */}
        <div>
          <p className={`font-semibold text-sm ${
            rccDetalle.length ? 'text-green-600' : 'text-slate-500'
          }`}>
            {rccDetalle.length ? 'Registros Financieros' : 'Sin registros financieros'}
          </p>

          {rccDetalle.length > 0 && (
            <div className="space-y-2 mt-3">
              {rccDetalle.map((r, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[52%_15%_30%] gap-3 border rounded-xl p-3 text-sm ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white'
                  }`}
                >
                  <p className="font-medium break-words">{r.ENTIDAD}</p>
                  <span className="inline-block w-fit px-2 py-2 rounded-full text-xs bg-green-100 text-green-700">
                    {r.CLASIFICACION}
                  </span>
                  <p className="text-slate-500 break-words">{r.DESCRIPCION}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
