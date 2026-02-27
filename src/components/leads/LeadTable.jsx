import LeadRow from './LeadRow'
import { useLocalTheme } from '../../context/useLocalTheme'

export default function LeadTable({ leads = [], loading, searched }) {
  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  return (
    <div className="overflow-x-auto">
      <table
        className={`
          w-full border text-sm transition-colors
          ${isDark
            ? 'border-slate-700 text-slate-200'
            : 'border-slate-300 text-slate-800'}
        `}
      >

<thead className={isDark ? 'bg-slate-800' : 'bg-gray-100'}>
  <tr>
    <th className="p-2 border">Alias</th>
    <th className="p-2 border">CampaOrigen</th>
    <th className="p-2 border">Gestion</th>
    <th className="p-2 border">IdKey_Computado</th>
    <th className="p-2 border">Campaña</th>
    <th className="p-2 border">DNI</th>
    <th className="p-2 border">Email</th>
    <th className="p-2 border">Email2</th>
    <th className="p-2 border">Fecha Creación</th>
    <th className="p-2 border">Fines Adicionales</th>
    <th className="p-2 border">Form ID</th>
    <th className="p-2 border">Hora Creación</th>
    <th className="p-2 border">Hora C</th>
    <th className="p-2 border">IdKey</th>
    <th className="p-2 border">Modelo</th>
    <th className="p-2 border">Name Form</th>
    <th className="p-2 border">Nombre Completo</th>
    <th className="p-2 border">Teléfono</th>
    <th className="p-2 border">Origen Negocio</th>
    <th className="p-2 border">Pauta</th>
    <th className="p-2 border">Perfil</th>
    <th className="p-2 border">Permite Llamada</th>
    <th className="p-2 border">Plataforma</th>
    <th className="p-2 border">Política</th>
  </tr>
</thead>

        <tbody>

          {loading && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Cargando...
              </td>
            </tr>
          )}

          {!loading && !searched && (
            <tr>
              <td
                colSpan="4"
                className={`text-center p-4 ${
                  isDark ? 'text-slate-400' : 'text-gray-500'
                }`}
              >
                Elige una fecha
              </td>
            </tr>
          )}

          {!loading && searched && leads.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className={`text-center p-4 ${
                  isDark ? 'text-slate-400' : 'text-gray-500'
                }`}
              >
                No hay registros
              </td>
            </tr>
          )}

          {!loading && leads.length > 0 &&
            leads.map((lead) => (
  <LeadRow key={lead.idkey} lead={lead} />
))
          }

        </tbody>
      </table>
    </div>
  )
}