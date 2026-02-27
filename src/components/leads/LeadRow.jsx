import LeadStatus from './LeadStatus'

export default function LeadRow({ lead }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border p-2">{lead.Alias}</td>
      <td className="border p-2">{lead.CampaOrigen}</td>
      <td className="border p-2">{lead.Gestion}</td>
      <td className="border p-2">{lead.IdKey_Computado}</td>
      <td className="border p-2">{lead.campania}</td>
      <td className="border p-2">{lead.dni}</td>
      <td className="border p-2">{lead.email}</td>
      <td className="border p-2">{lead.email2}</td>
      <td className="border p-2">{lead.fecha_creacion}</td>
      <td className="border p-2">{lead.finesadicionales}</td>
      <td className="border p-2">{lead.formid}</td>
      <td className="border p-2">{lead.hora_creacion}</td>
      <td className="border p-2">{lead.horac}</td>
      <td className="border p-2">{lead.idkey}</td>
      <td className="border p-2">{lead.modelo}</td>
      <td className="border p-2">{lead.nameform}</td>
      <td className="border p-2">{lead.nombre_completo}</td>
      <td className="border p-2">{lead.numero_telefono}</td>
      <td className="border p-2">{lead.origennegociointegracion}</td>
      <td className="border p-2">{lead.pautanameanuncio}</td>
      <td className="border p-2">{lead.perfil}</td>
      <td className="border p-2">{lead.permitellamada ? 'Sí' : 'No'}</td>
      <td className="border p-2">{lead.plataforma}</td>
      <td className="border p-2">{lead.politica}</td>
    </tr>
  )
}