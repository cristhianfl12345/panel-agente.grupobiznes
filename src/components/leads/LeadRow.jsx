import LeadStatus from './LeadStatus'
import { FiPhoneCall, FiClipboard, FiVolume2, FiPhoneOff } from 'react-icons/fi'
import { BsFillPlugFill } from 'react-icons/bs'
import { FaPhone } from 'react-icons/fa6'

export default function LeadRow({ lead, index }) {
  return (
 <tr className="hover:bg-gray-50 text-sm">

  {/* n = contador */}
    <td className="border p-2 text-center">
      {index}
    </td>

    {/* IdKey */}
  <td className="border p-2">
    {lead.idkey}
  </td>

  {/* perfil */}
  <td className="border p-2">
    {lead.perfil || '-'}
  </td>

  {/* customer_origin = CampaOrigen */}
  <td className="border p-2">
    {lead.CampaOrigen}
  </td>

  {/* U. Reg = idusuario */}
  <td className="border p-2 text-center">
    {lead.idusuario}
  </td>

  {/* Fono */}
  <td className="border p-2">
    {lead.numero_telefono}
  </td>

  {/* Plt = segmento */}
  <td className="border p-2">
    {lead.segmento || '-'}
  </td>

  {/* A. = Alias */}
  <td className="border p-2">
    {lead.Alias}
  </td>

  {/* Name Anuncio */}
  <td className="border p-2">
    {lead.pautanameanuncio}
  </td>

  {/* Reg = fecha_creacion */}
  <td className="border p-2 text-center">
    {lead.fecha_creacion?.toString().slice(0, 8)}
  </td>

  {/* D. = discador (icono si existe) */}
  <td className="border p-2 text-center">
    {lead.discador ? (
      <FiPhoneCall className="text-green-600 mx-auto" />
    ) : null}
  </td>

  {/* G. = gestiones (icono si existe) */}
  <td className="border p-2 text-center">
    {lead.gestiones ? (
      <FiClipboard className="text-blue-600 mx-auto" />
    ) : null}
  </td>

  {/* Ult Nivel */}
  <td className="border p-2 text-center">
    {lead.ultimocodcontacto ? (
      <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs ">
        {lead.ultimocodcontacto} - {lead.UltNivel2}
      </span>
    ) : (
      <FaPhone className="text-red-500 mx-auto" />
    )}
  </td>

  {/* Megáfono 1 */}
  <td className="border p-2 text-center">
    {lead.ultimofecha ? (
      <FiVolume2
        className="text-gray-600 mx-auto cursor-pointer"
        title={`${lead.ultimofecha} ${lead.ultimohora} - ${lead.ultgesasesorname}`}
      />
    ) : null}
  </td>

  {/* Mejor Nivel */}
  <td className="border p-2 text-center">
    {lead.mejorcodcontacto ? (
      <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
        {lead.mejorcodcontacto} - {lead.MejorNivel2}
      </span>
    ) : (
      <FiPhoneOff className="text-gray-400 mx-auto" />
    )}
  </td>

  {/* Megáfono 2 */}
  <td className="border p-2 text-center">
    {lead.mejorfecha ? (
      <FiVolume2
        className="text-green-600 mx-auto cursor-pointer"
        title={`${lead.mejorservicio} - ${lead.mejorhora}`}
      />
    ) : null}
  </td>

  {/* Atencion = horai */}
  <td className="border p-2 text-center">
    {lead.horai || '-'}
  </td>

  {/* W. = RswMejorIdCall */}
  <td className="border p-2 text-center">
    {lead.rswmejoridcall || '-'}
  </td>

  {/* W Mejor Nivel */}
  <td className="border p-2 text-center">
    {lead.rswmejornivel1 || '-'}
  </td>

  {/* Obs = icono enchufe si ObsApi != null */}
<td className="border p-2 text-center">
  {lead.ObsApi === null ? (
    <BsFillPlugFill
      className="text-green-600 mx-auto"
      title="Sin observaciones" // Opcional: un título por defecto
    />
  ) : null}
</td>


</tr>
  )
}